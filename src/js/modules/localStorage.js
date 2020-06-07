const hostId = "host";
const userId = "xizuth-id";
const widgetListId = "widgets";

const updateWidget = (widget) => {
  let widgets = JSON.parse(localStorage.getItem(widgetListId)) || new Array(); 

  for (let index = 0; index < widgets.length; index++) {
    if (widgets[index].id == widget.id) {
      widgets[index] = widget;
    }
  }
  setAllWidgets(widgets);
};

const saveUserStorage = (user = {}) => {
  localStorage.setItem(userId, JSON.stringify(user));
};

const getUserStorage = () => {
  return JSON.parse(localStorage.getItem(userId));
};

const deleteAll = () => {
  localStorage.clear();
};

const saveHostStorage = (host = { host, port }) => {
  localStorage.setItem(hostId, JSON.stringify(host));
};

const getHostStorage = () => {
  const host = localStorage.getItem(hostId);

  return JSON.parse(host) || null;
};

const setAllWidgets = (widgets) => {
  localStorage.setItem(widgetListId, JSON.stringify(widgets));
};

const insertWidget = (widget) => {
  let widgets = JSON.parse(localStorage.getItem(widgetListId)) || new Array();
  widgets.push(widget);
  setAllWidgets(widgets);
};

const removeWidget = (widgetId) => {
  let widgets = getAllWidget();

  if (!widgets.length) return;

  for (let index = 0; index < widgets.length; index++) {
    if (widgets[index]._id == widgetId) {
      widgets.splice(index, 1);
    }
  }
  setAllWidgets(widgets);
};

const getAllWidget = () => {
  return JSON.parse(localStorage.getItem(widgetListId)) || [];
};

module.exports = {
  saveUserStorage,
  getUserStorage,
  deleteAll,
  saveHostStorage,
  getHostStorage,
  insertWidget,
  updateWidget,
  removeWidget,
  getAllWidget,
};
