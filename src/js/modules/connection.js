import { getUserStorage, getHostStorage } from "./localStorage";
import { subscriptions, publishers, messageArrived } from "./connections";
import Toast from "./toast";
const Paho = require("paho-mqtt");
let client = null;

const disabledHeader = (status) => {
  document.getElementById("input-broker").disabled = status;
  document.getElementById("username-broker").disabled = status;
  document.getElementById("pwd-broker").disabled = status;
  document.getElementById("client-id-broker").disabled = status;
  const btnConnect = document.getElementById("btn-connect");
  if (status) {
    btnConnect.classList.remove("btn_connect");
    btnConnect.classList.add("btn_connected");
    btnConnect.innerText = "Connected";
  } else {
    btnConnect.classList.add("btn_connect");
    btnConnect.classList.remove("btn_connected");
    btnConnect.innerText = "Connect";
  }
};

const getConnectionSetting = (user) => {
  const connectionSettings = {
    onSuccess: onConnect,
    cleanSession: true,
    onFailure: function (error) {
      console.log(error);
      disabledHeader(false);
      Toast("Fail Connection", "#FF2400");
      alert("Fail Connection", error.errorMessage);
    },
    useSSL:  getHostStorage().ssl
  };
  if (user.username) {
    connectionSettings.userName = user.username;
  }
  if (user.pwd) {
    connectionSettings.password = user.pwd;
  }
  return connectionSettings;
};

function onConnect() {
  console.log("Connected");
  Toast("Connected", "#348017");
  subscriptions(client);
  publishers(client);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    disabledHeader(false);
    Toast("Fail Connection", "#FF2400");
    console.error("onConnectionLost:", responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  messageArrived(message);
}

/********************************************** */

const mqtt = (disconnect) => {
  const user = getUserStorage();
  const host = getHostStorage();

  if (client != null && disconnect) {
    console.log("Disconnected");
    Toast("Disconnected", "#254117");
    client.disconnect();
    client= null
    disabledHeader(false);
  } else {
    client = new Paho.Client(host.host, Number(host.port), user.clientId);
    disabledHeader(true);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect(getConnectionSetting(user));
  }
};

module.exports = mqtt;
