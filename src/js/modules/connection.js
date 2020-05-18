import { getUserStorage, getHostStorage } from "./localStorage";
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
      alert("Fail Connection", error.errorMessage);
    },
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
  // Once a connection has been made, make a subscription and send a message.
  console.log("Connected");
  client.subscribe("/home/");
  let message = new Paho.MQTT.Message(" dashboard Xizuth");
  message.destinationName = "/home/";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    alert("Fail Connection");
    disabledHeader(false);
    console.error("onConnectionLost:" + responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log(message);
  console.log("onMessageArrived:" + message.payloadString);
}

/********************************************** */

const mqtt = (disconnect) => {
  const user = getUserStorage();
  const host = getHostStorage();

  if (client != null && disconnect) {
    console.log("desconecto");

    client.disconnect();
    disabledHeader(false);
  } else {
    client = new Paho.MQTT.Client(
      host.host,
      Number(host.port),
      user.clientId
    ); 
    disabledHeader(true);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect(getConnectionSetting(user));
  }
};

module.exports = mqtt;
