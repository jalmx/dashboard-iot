import { getAllWidget } from "../localStorage";
import {loadWidgetUI} from "./loadWidget";
import {menuEvent} from "./menuCard";

const loadAllWidgets = () => {
  const listWidgets = getAllWidget(); 
  
  listWidgets.forEach((element) => {
    loadWidgetUI(element);
  });
  menuEvent();
};

export default loadAllWidgets;
