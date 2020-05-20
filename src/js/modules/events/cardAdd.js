import uid from "uid";
import { insertWidget } from "../localStorage";

const removeCardAddFromUI = () => {
  document.body.removeChild(document.getElementById("modal-container"));
};

const btnAddCard = () => {
  document.getElementById("add-widget").addEventListener("click", (e) => {
    e.preventDefault();
    const html = require("../html/htmlCardAdd");
    // document.getElementById("modal").classList.toggle("hidden");
    const modalContainer = document.createElement("DIV");
    modalContainer.setAttribute("id", "modal-container")
    modalContainer.innerHTML = html;
    document.body.appendChild(modalContainer);
  });
};

const getParametersFromCard = () => {
  const pinInput = document.getElementById("modal-pin");
  const boardInput = document.getElementById("modal-board");
  const colorInput = document.getElementById("modal-color");
  const iconInput = document.getElementById("modal-icon");
  const subfijeInput = document.getElementById("modal-subfije");
  const urlInput = document.getElementById("modal-url");
  const subscribeInput = document.getElementById("modal-subscribe");
  const widget = {
    id: `widget-${uid(25)}`,
    pin: pinInput.value,
    board: boardInput.value,
    color: colorInput.value,
    icon: iconInput.value,
    subfije: subfijeInput.value,
    status: subscribeInput.checked,
    topic: {
      suscribeTopic: `in/${urlInput.value}`,
      publicTopic: `out/${urlInput.value}`,
    },
  };
  insertWidget(widget);
  removeCardAddFromUI();
};

const btnsEventsCardAdd = () => {
  addEventListener("click", (e) => {
    const btn = e.target.id;

    if (btn == "modal-cancel") {
      e.preventDefault();
      removeCardAddFromUI();
    } else if (btn == "modal-ok") {
      e.preventDefault();
      getParametersFromCard();
    }
  });
};

const addCardEvents = () => {
  btnAddCard();
  btnsEventsCardAdd(); 
};

module.exports = addCardEvents;
