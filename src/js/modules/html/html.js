/**
 * Función para colocoar el html en la UI
 */

const setHTML = (id, html = "") => {
  const element = document.getElementById(id);
  element.innerHTML = html;
};

module.exports = setHTML