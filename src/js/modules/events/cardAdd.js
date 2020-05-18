import uid from "uid";
import { insertWidget } from "../localStorage";

const btnAddCard = () => {
  document.getElementById("add-widget").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("modal").classList.toggle("hidden");
  });
};

const btnAddWidget = () => {
  const pinInput = document.getElementById("modal-pin");
  const boardInput = document.getElementById("modal-board");
  const colorInput = document.getElementById("modal-color");
  const iconInput = document.getElementById("modal-icon");
  const subfijeInput = document.getElementById("modal-subfije");
  const urlInput = document.getElementById("modal-url");
  const subscribeInput = document.getElementById("modal-subscribe");
  const widget = {
    id: `widget-${uid()}`,
    pin: pinInput.value,
    board: boardInput.value,
    color: colorInput.value,
    icon: iconInput.value,
    subfije: subfijeInput.value,
    status:subscribeInput.checked,
    topic: {
        suscribeTopic:`in/${urlInput.value}`,
        publicTopic:`out/${urlInput.value}`
    },
  }
  console.log(widget);
  
  insertWidget(widget);
};

const btnsEventsCardAdd = () => {
  document.getElementById("modal-cancel").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("modal").classList.toggle("hidden");
  });

  document.getElementById("modal-ok").addEventListener("click", (e) => {
    e.preventDefault();
    btnAddWidget();
  });
};

const addCardEvents = () => {
  btnAddCard();
  btnsEventsCardAdd();
};

module.exports = addCardEvents;
