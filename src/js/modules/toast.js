import html from "./html/htmlToast";

const Toast = (message, color) => {
  const body = document.body;
  const toast = document.createElement("div");
  toast.innerHTML = html(message, color);
  body.appendChild(toast);

  setTimeout(() => {
    body.removeChild(toast);
  }, 2000);
};

export default Toast;
