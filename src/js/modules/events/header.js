import mqtt from "../connection";
import {
  saveHostStorage,
  getHostStorage,
  saveUserStorage,
  getUserStorage,
} from "../localStorage";
import getHost from "../host";
import generateClientId from "../generateClientId";
/**
 * Save Host
 */
const saveData = () => {
  document.getElementById("btn-connect").addEventListener("click", (e) => {
    e.preventDefault();
    saveHostUI();
    saveUserUI(); 
    
    let status = e.target.classList.contains("btn_connect") == true ? false : true;

    mqtt(status);
  });
};

const saveHostUI = () => {
  const hostInput = document.getElementById("input-broker");

  if (hostInput.value.trim() == "") {
    alert("No host");
    hostInput.focus();
    return;
  }
  saveHostStorage(getHost(hostInput.value.trim()));
};

const saveUserUI = () => {
  const user = {};
  const username = document.getElementById("username-broker");
  const pwd = document.getElementById("pwd-broker");
  const clientId = document.getElementById("client-id-broker");

  if (username.value.trim() != "") {
    user.username = username.value.trim();
  }
  if (pwd.value.trim() != "") {
    user.pwd = pwd.value.trim();
  }
  if (clientId.value.trim() == "") {
    user.clientId = generateClientId();
    clientId.value = user.clientId;
  } else {
    user.clientId = clientId.value.trim();
  }

  saveUserStorage(user);
};
/**
 * Load host from localStorage if exits
 */
const getHostStorageLocal = () => {
  const host = getHostStorage();
  if (host != null) {
    document.getElementById("input-broker").value = `${host.host}:${host.port}`;
  }
};

const getClientStorageLocal = () => {
  const userLocal = getUserStorage();
  const username = document.getElementById("username-broker");
  const pwd = document.getElementById("pwd-broker");
  const clientId = document.getElementById("client-id-broker");
  if (userLocal != null) {
    username.value = userLocal.username ? userLocal.username : "";
    pwd.value = userLocal.pwd ? userLocal.pwd : "";
    clientId.value = userLocal.clientId
      ? userLocal.clientId
      : generateClientId();
  } else {
    clientId.value = generateClientId();
  }
};

const getLoadSaveClient = () => {
  getHostStorageLocal();
  getClientStorageLocal();
};

const headerEvents = () => {
  saveData();
  getLoadSaveClient();
};

module.exports = headerEvents;
