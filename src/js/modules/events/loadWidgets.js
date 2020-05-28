import { getAllWidget } from "../localStorage";
import loadWidget from "./loadWidget";
import menuEvent from "./menuCard";

const loadAllWidgets = () => {
  const listWidgets = getAllWidget();
  listWidgets.forEach((element) => {
    loadWidget(element);
  });
  menuEvent();
};

export default loadAllWidgets;
