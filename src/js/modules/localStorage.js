// TODO:
/**
 * Almacenara todos los widgets del dashboard
 */

const hostId = "host";
const userId = "xizuth-id";
const widgetListId = "widgets";

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

const insertWidget = (widget) => {
  let widgets = JSON.parse(localStorage.getItem(widgetListId)) || new Array();
  console.log("lista de widgets", widgets);
  widgets.push(widget);
  localStorage.setItem(widgetListId, JSON.stringify(widgets));
};

const removeWidget = (widgetId) => {
  let widgets = localStorage.getItem(widgetId);

  if (widgets == null || widgets.length == 0) {
    return [];
  }

  widgets = JSON.parse(widgets);

  // TODO: Recorrer el array y remover el item del array
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
  removeWidget,
  getAllWidget,
};
