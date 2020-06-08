import {getAllWidget, updateWidget } from "../localStorage";
import buildCard from "../html/htmlCard"; 

document.addEventListener("click", (e)=>{ 
  if(e.target.id.indexOf("card-btn-status-")!= -1){
    
    const data = e.target.dataset
    const id = data.id
    const widgets = getAllWidget()
    widgets.forEach(widget => {
     if(widget.id == `widget-${id}`){
       widget.status = e.target.checked
       updateWidget(widget)
       if(widget.icon.input) disabeInputCard(widget._id)
     }
    }); 
  }
})

const disabeInputCard = (id)=>{
  const input = document.getElementById(`input-${id}`)
  input.disabled = !input.disabled
} 

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
