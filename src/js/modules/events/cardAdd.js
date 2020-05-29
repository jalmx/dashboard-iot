import uid from "uid";
import { insertWidget } from "../localStorage";
import addCardWidget from "../events/loadWidget";
import connections from '../connections'

const removeCardAddFromUI = () => {
  document.body.removeChild(document.getElementById("modal-container"));
};

const getColorPickerModalOn = () => {
  return document.getElementById("modal-color-on").value;
};

const getElementIconFromModel = () => {
  return document.getElementById("modal-icon");
};

const getIconFromModel = () => {
  const iconFeature = {};
  const icon = getElementIconFromModel();

  if (icon.hasChildNodes()) {
    iconFeature.input = icon.firstChild.type;
  } else {
    const iconsList = icon.classList;

    for (let index = 0; index < iconsList.length; index++) {
      const element = iconsList[index];
      let hasIcon = element.search(/icon-/);
      let hasIcon2 = element.search(/icn-m/);

      if (hasIcon != -1 || hasIcon2 != -1) {
        iconFeature.icon = element;
      }
    }
  }

  return iconFeature;
};

const btnAddCard = () => {
  document.getElementById("add-widget").addEventListener("click", (e) => {
    e.preventDefault();
    const html = require("../html/htmlCardAdd");
    const modalContainer = document.createElement("DIV");
    modalContainer.setAttribute("id", "modal-container");
    modalContainer.innerHTML = html;
    document.body.appendChild(modalContainer); 
  });

  document.addEventListener("click", e=>{
    if(e.target.classList.contains("modal")){
      removeCardAddFromUI()
    }
  })
};

const getParametersFromCard = () => {
  const pinInput = document.getElementById("modal-pin");
  const boardInput = document.getElementById("modal-board");
  const colorOnInput = document.getElementById("modal-color-on");
  const colorOffInput = document.getElementById("modal-color-off");
  const subfijeInput = document.getElementById("modal-subfije");
  const thingInput = document.getElementById("modal-thing");
  const status = document.getElementById("modal-subscribe");
  const subscribeInput = document.getElementById("topic-subscribe");
  const publishInput = document.getElementById("topic-publish");
  const payloadSubscribeOn = document.getElementById("payload-subscribe-on");
  const payloadSubscribeOff = document.getElementById("payload-subscribe-off");
  const payloadPublishOn = document.getElementById("payload-publish-on");
  const payloadPublishOff = document.getElementById("payload-publish-off");
  const descriptionInput = document.getElementById("modal-input-description");

  const id = uid(25);
  const widget = {
    id: `widget-${id}`,
    _id: id,
    pin: pinInput.value,
    board: boardInput.value,
    icon: getIconFromModel(),
    subfije: subfijeInput.value,
    status: status.checked,
    thing: thingInput.value,
    description: descriptionInput.value,
    value: status.checked?payloadSubscribeOn.value: payloadSubscribeOff.value,
    thingColor: {
      colorOn: colorOnInput.value,
      colorOff: colorOffInput.value,
    },
    topic: {
      subscribe: {
        topic: subscribeInput.value,
        payloadOn: payloadSubscribeOn.value,
        payloadOff: payloadSubscribeOff.value,
      },
      publish: {
        topic: publishInput.value,
        payloadOn: payloadPublishOn.value,
        payloadOff: payloadPublishOff.value,
      },
    },
  };
  insertWidget(widget);
  removeCardAddFromUI();
  return widget;
};

const btnsEventsCardAdd = () => {
  addEventListener("click", (e) => {
    const btn = e.target.id;
    eventsModal();
    if (btn == "modal-cancel") {
      e.preventDefault();
      removeCardAddFromUI();
    } else if (btn == "modal-ok") {
      e.preventDefault();
      addCardWidget(getParametersFromCard());
      connections.subscription()
    }
  });
};

const eventsModal = () => {
  addEventListener("change", (e) => {
    changeColorIconModal(e);
    changeIconModal(e);
  });
};

const changeColorIconModal = (e) => {
  if (e.target.id == "modal-color-on") {
    const color = getColorPickerModalOn();
    const icon = getElementIconFromModel();
    icon.style.color = color;
  }
};

const loadIconModal = (data) => {
  const icon = getElementIconFromModel();

  for (let index = 0; index < icon.classList.length; index++) {
    const element = icon.classList[index].trim();

    let hasIcon = element.search(/icon-/);
    let hasIcon2 = element.search(/icn-m/);

    if (hasIcon != -1 || hasIcon2 != -1) {
      icon.classList.remove(element);
      if (data.iconOn) {
        icon.innerText = "";
        icon.classList.add(data.iconOn);
      }
    } else if (data.iconOn) {
      icon.classList.add(data.iconOn);
    }

    if (data.input) {
      icon.innerText = "";
      icon.innerHTML = `<input type="${data.input}" >`;
    }
    if (data.color)
      document.getElementById("modal-color-on").value = data.color;
    icon.style.color = data.color != "" ? data.color : getColorPickerModalOn();
  }
};

const changeIconModal = (e) => {
  if (e.target.id == "modal-thing") {
    const listThings = document.getElementById("modal-thing");
    const dataset = listThings.options[e.target.selectedIndex].dataset;
    loadIconModal(dataset);
  }
};

const addCardEvents = () => {
  btnAddCard();
  btnsEventsCardAdd();
};

module.exports = addCardEvents;
