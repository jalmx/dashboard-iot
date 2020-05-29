import { removeWidget } from "../localStorage";
import Toast from "../toast";
import connections from '../connections'

const deleteCard = (id) => {
  const card = document.getElementById(`card-widget-${id}`);
  const main = document.getElementById("main");
  main.removeChild(card);
  removeWidget(id);
  Toast("Widget deleted");
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
        console.log("a editar el widget", e.target.dataset.id);
        // TODO: lanzar el add widget con todos los datos cargador
      } else if (e.target.dataset.menu == "delete") {
        deleteCard(e.target.dataset.id);
        connections.subscription()
      }
    } 
    
    if (e.target.classList.contains("main")) {
      const menus = document.querySelectorAll(".card__header__menu__container")
      menus.forEach(menu =>{
        menu.classList.add("hidden"); 
        
      })
    }
  });
};

module.exports = menuEvent;
