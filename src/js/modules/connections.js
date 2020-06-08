import { getAllWidget } from "./localStorage";
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
    if (widget.topic.subscribe.topic)
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

const eventPublish = (e) => {
  if (!client || !e.target.dataset.widget) return;

  const card = document.getElementById("body-" + e.target.dataset.id);
  const data = card.dataset;
  const id = data.id.trim();

  const widget = widgetsList[id];

  if (!widget) return console.log("No widget exist");

  if (!widget.topic.publish.topic)
    return console.log("No have to topic to publish");

  let value = "";

  if (widget.thing == "value" || widget.icon.input) {
    console.log("input", widget.icon.input);

    if (widget.icon.input == "textarea") {
      const input = document.getElementById(`input-${id}`);
      value = input.textContent;
    } else if (widget.thing == "value") {
      const text = document.getElementById(`value-${id}`);
      value = text.textContent;
    } else {
      const input = document.getElementById(`input-${id}`);
      value = input.value;
      console.log("input", value);
    }
  } else {
    value =
      widget.value == widget.topic.publish.payloadOn
        ? widget.topic.publish.payloadOff
        : widget.topic.publish.payloadOn;
  }

  if (!value) return console.log("No have value to send");

  const message = new Paho.Message(value);
  message.retained = true
  message.qos = 1
  message.destinationName = widget.topic.publish.topic;
  client.send(message);
};

const publishers = (c) => {
  client = c;
  document.addEventListener("click", (e) => eventPublish(e));
  document.addEventListener("change", (e) => eventPublish(e));
};

const updateCard = (widget, message) => {
  const id = widget._id;
  const status = document.getElementById(`card-btn-status-${id}`);
  if (!status || !status.checked) return console.log("no activated widget", id);
  const icon = document.getElementById(`card-icon-${id}`);

  let changeValue = false;

  if (message.payloadString == widget.topic.subscribe.payloadOn) {
    if (widget.icon.icon) {
      icon.style.color = widget.thingColor.colorOn;
      icon.classList.add(widget.icon.iconOn);
      if (widget.icon.iconOff) icon.classList.remove(widget.icon.iconOff);
      if (widget.class) {
        icon.classList.add(widget.class);
      }
      changeValue = true;
    }
  } else if (message.payloadString == widget.topic.subscribe.payloadOff) {
    if (widget.icon.icon) {
      icon.style.color = widget.thingColor.colorOff;
      if (widget.icon.iconOff) {
        icon.classList.add(widget.icon.iconOff);
        icon.classList.remove(widget.icon.iconOn);
      }
      if (widget.class) {
        icon.classList.remove(widget.class);
      }
      changeValue = true;
    }
  }

  if (
    widget.icon.input &&
    message.destinationName == widget.topic.subscribe.topic
  ) {
    const input = document.getElementById(`input-${id}`);
    input.value = message.payloadString;
  }

  if (widget.thing.match("value")) {
    const value = document.getElementById(`value-${id}`);
    const subfije = document.getElementById(`subfije-${id}`);
    value.textContent = message.payloadString;
    subfije.textContent = widget.subfije;
  }
  if (changeValue) widget.value = message.payloadString;
};

const loggersUpdate = (message) => {
  const loggers = document.querySelectorAll(".logger");

  loggers.forEach((log) => {
    updateLogger(log, message);
  });
};

const updateLogger = (log, message) => {
  const status = document.getElementById(`card-btn-status-${log.dataset.id}`);

  if (!status.checked) return;

  log.textContent = `From: ${message.destinationName}: ${
    message.payloadString
  }\t${moment().format("LTS")}\n${log.textContent}`;
};

const messageArrived = (message) => {
  console.log("From", message.destinationName);
  console.log("onMessageArrived:" + message.payloadString);
  if (!message.payloadString) return console.log("Message empty");

  loggersUpdate(message);

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
