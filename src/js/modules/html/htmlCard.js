const getInput = (data) => {
  console.log(data);
  let input = "";
  if (data.thing == "textarea") {
    input = `<textarea class="logger"></textarea>`;
  } else {
    input = `<input type="${data.icon.input}">`; 
  }
  return input;
};

module.exports = (data) => {
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  return /*html*/ ` 
<header class="card__header">
    <h3 class="card__header__pin cursor" id="card-pin">${data.pin}</h3>
    <h3 class="card__header__pin cursor" id="card-pin">${data.board}</h3>
    <i class="card__header__menu icon-menu">
        <div class="card__header__menu__menu" id="card-menu"></div>
    </i>
</header>
<div class="card__body">
    <div style="color: ${ data.status == true ? data.thingColor.colorOn : data.thingColor.colorOff };" data-color-on="${data.thingColor.colorOn}" data-color-off="${ data.thingColor.colorOff }" data-icon="${
    data.icon.icon != undefined ? data.icon.icon : "" }" class="card__body__icon pointer icons-size ${ data.icon.icon != undefined ? data.icon.icon : "" } id="card-icon"> ${data.thing == "input" ? getInput(data) : ""}${ data.subfije != "" ? data.subfije : "" }
    </div>
      <h2 class="card__body__description pointer" title="Description: ${ data.description }" id="card-description">${data.description}</h2>
    </div>
<footer class="card__footer">
    <div class="card__footer__topic">
    <input class="card__footer__url" type="url" title="Subscribe to: ${ data.topic.subscribe.topic }" disabled="" placeholder="${ data.topic.subscribe.topic == "" ? "no topic" : data.topic.subscribe.topic }" value="${data.topic.subscribe.topic}" id="card-topic-subscribe-${data.id}" data-payload-on="${data.topic.subscribe.payloadOn}" data-payload-off="${data.topic.subscribe.payloadOff}"/>
    <input class="card__footer__url" type="url" title="Publish to: ${ data.topic.publish.topic }" disabled="" placeholder="${data.topic.publish.topic == "" ? "no topic" : data.topic.publish.topic }" id="card-topic-publish-${data.id}" value="${data.topic.publish.topic}" data-payload-on="${data.topic.publish.payloadOn}" data-payload-off="${data.topic.publish.payloadOff}"/> 
    </div>
    <div class="card__footer__btn"><label class="switch"><input type="checkbox" ${ data.status == true ? "checked" : "" } id="card-btn-status" /><span class="slider round"></span></label></div>
</footer>
`;
};
