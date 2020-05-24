import buildCard from "../html/htmlCard";

const loadWidget = (data = {}) => {
  const mainElement = document.getElementById("main");
  const cardElement = document.createElement("article");
  cardElement.setAttribute("id", `card-${data.id}`);
  cardElement.setAttribute("class", "card"); 
  cardElement.innerHTML = buildCard(data);
  mainElement.appendChild(cardElement);
};

export default loadWidget;
