import buildCard from "../html/htmlCard";

const createCard = (data, child) => {
  const mainElement = document.getElementById("main");
  const cardElement = document.createElement("article");
  cardElement.setAttribute("id", `card-${data.id}`);
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("data-id", data._id);
  const html = buildCard(data);
  cardElement.innerHTML = html; 

  child
    ? mainElement.replaceChild(cardElement, child)
    : mainElement.appendChild(cardElement);
};

const updateWidgetUI = (data) => {
  const oldChild = document.getElementById(`card-${data.id}`);
  createCard(data, oldChild);
};

const loadWidgetUI = (data) => { 
  createCard(data);
};

module.exports = {
  loadWidgetUI,
  updateWidgetUI,
};
