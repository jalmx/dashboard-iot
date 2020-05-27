const getInput = (data) => {
  // console.log(data);
  let input = "";
  if (data.thing == "textarea") {
    input = `<textarea class="logger" name="" cols="30" rows="10" id="input-${data._id}" disabled></textarea>`;
  } else {
    input = `<input class="input-data" type="${data.icon.input}" id="input-${data._id}">`; 
  }
  return input;
};

module.exports = (data) => {
  return /*html*/ ` 
<header class="card__header">
    <h3 class="card__header__pin cursor" id="card-pin">${data.pin}</h3>
    <h3 class="card__header__pin cursor" id="card-pin">${data.board}</h3>
    <i class="card__header__menu icon-menu">
        <div class="card__header__menu__menu" id="card-menu"></div>
    </i>
</header>
<div class="card__body" id="body-${data._id}" data-id="${data._id}">
    <div style="color: ${ data.status ? data.thingColor.colorOn : data.thingColor.colorOff };" class="card__body__icon pointer icons-size ${data.icon.icon ? data.icon.icon : "" }" id="card-icon-${data._id}" data-id="${data._id}">
      ${data.thing == "input" || data.thing == "textarea"? getInput(data) : ""} <span>${ data.subfije ? data.subfije : "" }</span>
    </div>
      <h2 class="card__body__description pointer" title="Description: ${ data.description }" id="card-description-${data._id}" data-id="${data._id}">${data.description}</h2>
    </div>
<footer class="card__footer">
  <div class="card__footer__topic">
    <input class="card__footer__url" type="url" title="Subscribe to: ${ data.topic.subscribe.topic }" disabled placeholder="${ data.topic.subscribe.topic ?  data.topic.subscribe.topic : "no topic"}" value="${data.topic.subscribe.topic}" id="card-topic-subscribe-${data.topic.subscribe.topic}"/>

    <input class="card__footer__url" type="url" title="Publish to: ${ data.topic.publish.topic }" disabled placeholder="${data.topic.publish.topic ? data.topic.publish.topic : "no topic" }" id="card-topic-publish-${data.id}" value="${data.topic.publish.topic}"/> 
  </div>
    <div class="card__footer__btn">
      <label class="switch">
        <input type="checkbox" ${data.status ? "checked" : "" } data-id="${data._id}" id="card-btn-status-${data._id}"/><span class="slider round"></span>
      </label>
    </div>
</footer>
`;
};
