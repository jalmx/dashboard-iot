import { removeWidget,getAllWidget } from "../localStorage";
import Toast from "../toast";
import connections from "../connections";
import { renderModal } from "./cardAdd";

const deleteCard = (id) => {
  const card = document.getElementById(`card-widget-${id}`);
  const main = document.getElementById("main");
  main.removeChild(card);
  removeWidget(id);
  Toast("Widget deleted");
};

const removeMenu = () => {
  const menus = document.querySelectorAll(".card__header__menu__container");
  menus.forEach((menu) => {
    menu.classList.add("hidden");
  });
};

const menuEvent = () => {
  addEventListener("click", (e) => {
    if (e.target.dataset.menu) {
      if (e.target.dataset.menu == "menu") {
        const menu = document.getElementById(
          `card-menu-list-${e.target.dataset.id}`
        );
        menu.classList.toggle("hidden");
      } else if (e.target.dataset.menu == "edit") { 
        const widgets = getAllWidget() 
        widgets.forEach(widget =>{
          if(widget._id == e.target.dataset.id){
            removeMenu(); 
            renderModal(widget);
          }
        }) 
        
      } else if (e.target.dataset.menu == "delete") {
        deleteCard(e.target.dataset.id);
        connections.subscription();
      }
    }

    if (e.target.classList.contains("main")) {
      removeMenu();
    }
  });
};

module.exports = menuEvent;
