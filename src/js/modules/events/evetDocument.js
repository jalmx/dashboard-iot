import { removeMenu } from "./menuCard";
import { removeCardAddFromUI } from "./cardAdd";
import Toast from "../toast";

const clearInput = (e) => {
  if (e.target.tagName.match("INPUT")) {
    e.target.value = "";
  }
};

const invalidTopic = (e) => {
  if (e.target.id == "topic-subscribe" || e.target.id == "topic-publish") {
    if (
      e.target.value.indexOf("#") != -1 ||
      e.target.value.indexOf("+") != -1 ||
      e.target.value.indexOf(" ") != -1
    ) {
      Toast(
        e.target.value.indexOf(" ") != -1
          ? "Can't be empty"
          : "No wildcard supported",
        "#C11B17"
      );
      e.target.classList.add("warning");
    } else {
      e.target.classList.remove("warning");
    }
  }
};

export default () => {
  document.addEventListener("keyup", (e) => {
    if (e.keyCode == 27) { 
      removeMenu();
      removeCardAddFromUI();
      clearInput(e);
    }
    invalidTopic(e);
  });
};
