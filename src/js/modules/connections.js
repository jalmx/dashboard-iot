import { getAllWidget, getStatusStorage } from "./localStorage";
import Toast from "./toast";
import moment from "moment";
const Paho = require("paho-mqtt");
const topicsSubscribeList = {};
const widgetsList = {};
let client = null;

const saveTopicSubscribe = (widget) => {
  if (widget.topic.subscribe.topic) {
    if (topicsSubscribeList[widget.topic.subscribe.topic]) {
      topicsSubscribeList[widget.topic.subscribe.topic].push(widget);
    } else {
      topicsSubscribeList[widget.topic.subscribe.topic] = [widget];
    }
  }
  widgetsList[widget._id] = widget;
};

const loadSubscriptions = () => {
  const listWidgets = getAllWidget();

  for (let index = 0; index < listWidgets.length; index++) {
    const widget = listWidgets[index];
    if (!widget.topic.subscribe.topic) continue;
    client.subscribe(widget.topic.subscribe.topic);
    saveTopicSubscribe(widget);
  }
};

const subscriptions = (c) => {
  client = c;

  if (client) {
    loadSubscriptions();
  } else {
    console.log("Can`t subscribe");
    Toast("Fail to subscriptions", "tomato");
  }
};

const subscription = () => {
  if (client) {
    console.log("Actualizar elements");
    loadSubscriptions();
  }
};

const publishers = (client) => {
  document.addEventListener("click", (e) => {
    if (!client || !e.target.dataset.widget) return;

    const card = document.getElementById("body-" + e.target.dataset.id);
    const data = card.dataset;
    const widget = widgetsList[data.id.trim()];

    if (!widget.topic.publish.topic)
      return console.log("No have to topic to publish");

    const value =
      widget.value == widget.topic.publish.payloadOn
        ? widget.topic.publish.payloadOff
        : widget.topic.publish.payloadOn;

    const message = new Paho.Message(value);
    message.destinationName = widget.topic.publish.topic;
    client.send(message);
  });

  document.addEventListener("change", (e) => {
    console.log("Algo cambio");
    //TODO: cuando de enter envien los inputs su informacion
  });
};

const updateCard = (widget, message, hashtag) => {
  const id = widget._id;
  const status = document.getElementById(`card-btn-status-${id}`); 
  if (!status || !status.checked) return console.log("no activated widget", id);
  const icon = document.getElementById(`card-icon-${id}`);
  //TODO: checar que iconos van a cambiar de estado y ver la transicion del cambio

  let changeValue = false;

  if (message.payloadString == widget.topic.subscribe.payloadOn) {
    if (widget.icon.icon) {
      icon.style.color = widget.thingColor.colorOn;
      changeValue = true;
    }
  } else if (message.payloadString == widget.topic.subscribe.payloadOff) {
    if (widget.icon.icon) {
      icon.style.color = widget.thingColor.colorOff;
      changeValue = true;
    }
  } else if (hashtag) {
    const logger = document.getElementById(`input-${id}`);
    logger.innerText += message.payloadString + logger.textContent;
  }

  if (changeValue) widget.value = message.payloadString;
};

const updateLogger = (log, message) => {
  log.textContent = `From: ${message.destinationName}: ${
    message.payloadString
  }\t${moment().format("LTS")}\n${log.textContent}`;
};

const messageArrived = (message) => {
  console.log("From", message.destinationName);
  console.log("onMessageArrived:" + message.payloadString);
  if (!message.payloadString) return console.log("Message empty");

  const loggers = document.querySelectorAll(".logger");

  loggers.forEach((log) => {
    updateLogger(log, message);
  });

  if (!topicsSubscribeList[message.destinationName])
    return console.log("No one is subscribe to: ", message.destinationName);

  topicsSubscribeList[message.destinationName].forEach((widget) => {
    console.log("To upload widget", widget._id);
    updateCard(widget, message);
  });
};

module.exports = {
  subscriptions,
  subscription,
  publishers,
  messageArrived,
};
