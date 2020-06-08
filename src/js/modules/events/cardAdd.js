import uid from "uid";
import { loadWidgetUI, updateWidgetUI } from "../events/loadWidget";
import { insertWidget, updateWidget } from "../localStorage";
import connections from "../connections";

const removeCardAddFromUI = () => {
  const modal = document.getElementById("modal-container");
  modal ? document.body.removeChild(modal) : null;
};

const getColorPickerModalOn = () => {
  return document.getElementById("modal-color-on").value;
};

const getElementIconFromModal = () => {
  return document.getElementById("modal-icon");
};

const getIconFromModal = () => {
  const iconFeature = {};
  const icon = getElementIconFromModal();

  if (icon.firstElementChild) {
    iconFeature.input = getDataIcon().input;
  } else {
    const iconsList = icon.classList;

    for (let index = 0; index < iconsList.length; index++) {
      const element = iconsList[index];
      let hasIcon = element.search(/icon-/);
      let hasIcon2 = element.search(/icn-m/);

      if (hasIcon != -1 || hasIcon2 != -1) {
        const icons = getDataIcon();
        iconFeature.icon = icons.iconOn;
        iconFeature.iconOn = icons.iconOn;
        iconFeature.iconOff = icons.iconOff ? icons.iconOff : "";
      }
    }
  }
  return iconFeature;
};

const getParametersFromCard = () => {
  const modal = document.getElementById("modal");
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

  if (!modal) return;

  let dataModal = modal.dataset;
  const statusModal = dataModal.edit == "0" ? false : true;
  const id = statusModal ? dataModal.id : uid(25);

  const widget = {
    id: `widget-${id}`,
    _id: id,
    pin: pinInput.value,
    board: boardInput.value,
    icon: getIconFromModal(),
    class: getDataIcon().class,
    subfije: subfijeInput.value,
    status: status.checked,
    thing: thingInput.value,
    description: descriptionInput.value,
    value: status.checked
      ? payloadSubscribeOn.value
      : payloadSubscribeOff.value,
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
  return { widget, edit: statusModal ? statusModal : false };
};

const getDataIcon = () => {
  const selectIcon = document.getElementById("modal-thing");
  const text = selectIcon.value.toLocaleLowerCase();
  const childrens = selectIcon.children;

  for (let index = 0; index < childrens.length; index++) {
    const element = childrens[index];

    if (element.value.match(text)) {
      return element.dataset;
    }
  }

  return "";
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
      const data = getParametersFromCard();
      if (!data) return;
      const { widget, edit } = data;
      removeCardAddFromUI();

      if (edit) {
        updateWidgetUI(widget);
        updateWidget(widget);
        connections.subscription();
      } else {
        loadWidgetUI(widget);
        insertWidget(widget);
        connections.subscription();
      }
    }
  });
};

const btnChange = () => {
  const btnAdd = document.getElementById("modal-ok");
  btnAdd.textContent = "Actualizar";
};

const renderModal = (widget) => {
  const html = require("../html/htmlCardAdd");
  const modalContainer = document.createElement("DIV");
  modalContainer.setAttribute("id", "modal-container");
  modalContainer.innerHTML = html(widget);
  document.body.appendChild(modalContainer);
  btnsEventsCardAdd();
  widget ? btnChange() : null;
};

const btnAddCard = () => {
  document.addEventListener("click", (e) => {
    if (e.target.id == "add-widget") {
      e.preventDefault();
      renderModal();
    }

    if (e.target.classList.contains("modal")) {
      removeCardAddFromUI();
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
    const icon = getElementIconFromModal();
    icon.style.color = color;
  }
};

const loadIconModal = (data) => {
  const icon = getElementIconFromModal();

  for (let index = 0; index < icon.classList.length; index++) {
    const element = icon.classList[index].trim();

    let hasIcon = element.search(/icon-/);
    let hasIcon2 = element.search(/icn-m/);

    if (hasIcon != -1 || hasIcon2 != -1) {
      icon.classList.remove(element); 

      if (data.iconOn) {
        icon.innerText = "";
        if (data.iconOn.match("icon-text")) {
          icon.innerHTML = /*html*/ `<h1>Value</h1>`
        }
        icon.classList.add(data.iconOn);
      }
    } else if (data.iconOn) {
      icon.classList.add(data.iconOn);
    }

    if (data.input) {
      if (data.input == "textarea") {
        icon.innerText = "";
        icon.innerHTML = /*html*/ `<textarea class="logger" cols="30" rows="10" disabled></textarea>`;
      } else {
        icon.innerText = "";
        icon.innerHTML = /*html*/ `<input type="${data.input}" disabled>`;
      }
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
};

module.exports = { addCardEvents, renderModal , removeCardAddFromUI};
