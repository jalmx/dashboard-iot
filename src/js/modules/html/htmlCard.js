export const getInput = (data) => {
  let input = "";
  if (data.icon.input == "textarea") {
    input = `<textarea class="${data.class ? data.class : ""}" data-id="${ data._id }" data-widget="widget" cols="30" rows="10" id="input-${data._id}" disabled></textarea>`;
  } else {
    input = `<input class="input-data" data-input="${data.icon.input}" type="${data.icon.input}" id="input-${data._id}" data-id="${data._id}" data-widget="widget">`;
  }
  return input;
};

export default (data) => {
  return /*html*/ ` 
<header class="card__header">
    <h3 class="card__header__pin cursor" id="card-pin">${data.pin}</h3>
    <h3 class="card__header__pin cursor" id="card-board">${data.board}</h3>
    <i class="card__header__menu icon-menu" data-id="${
      data._id
    }" data-menu="menu" id="card-menu-btn-${data._id}"></i>
    <ul class="card__header__menu__container  hidden" data-id="${
      data._id
    }" id="card-menu-list-${data._id}">
      <li class="card__header__menu__item pointer" data-id="${
        data._id
      }" data-menu="edit">Edit</li>
      <li class="card__header__menu__item pointer" data-id="${
        data._id
      }" data-menu="delete">Delete</li>
    </ul>
</header>
<div class="card__body" id="body-${data._id}" data-id="${data._id} ">
    <div style="color: ${
      data.status ? data.thingColor.colorOn : data.thingColor.colorOff
    };" class="card__body__icon pointer icons-size ${
    data.icon.icon ? data.icon.icon : ""
  }" id="card-icon-${data._id}" data-id="${data._id}" data-widget="widget" >
      ${data.icon.input ? getInput(data) : ""}
      <span id="value-${data._id}" data-id="${data._id}" data-widget="widget">${ data.thing == "value" ? "-" : "" }</span> 
      <span id="subfije-${data._id}" data-id="${data._id}" data-widget="widget">${
    data.subfije ? data.subfije : ""
  }</span>
    </div>
      <h2 class="card__body__description pointer" title="Description: ${
        data.description
      }" id="card-description-${data._id}" data-id="${
    data._id
  }" data-widget="widget">${data.description}</h2>
    </div>
<footer class="card__footer">
  <div class="card__footer__topic"><input class="card__footer__url" type="url" title="Subscribe to: ${
    data.topic.subscribe.topic
  }" disabled placeholder="${
    data.topic.subscribe.topic
      ? data.topic.subscribe.topic
      : "no topic subscribe"
  }" value="${data.topic.subscribe.topic}" id="card-topic-subscribe-${
    data.topic.subscribe.topic
  }"/><input class="card__footer__url" type="url" title="Publish to: ${
    data.topic.publish.topic
  }" disabled placeholder="${
    data.topic.publish.topic ? data.topic.publish.topic : "no topic publish"
  }" id="card-topic-publish-${data.id}" value="${data.topic.publish.topic}"/> 
  </div>
    <div class="card__footer__btn"> <label class="switch"><input type="checkbox" ${
      data.status ? "checked" : ""
    } data-id="${data._id}" id="card-btn-status-${
    data._id
  }"/><span class="slider round"></span></label>
    </div>
</footer>
`;
};
