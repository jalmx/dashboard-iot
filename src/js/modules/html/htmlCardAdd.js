const html = require("./htmlCard");
const getInput = html.getInput;

module.exports = (data) => {
  return /*html*/ `
<div class="modal" id="modal" data-edit="${data ? 1 : 0}" data-id="${ data ? data._id : "" }">
<div class="card modal__card">
    <header class="card__header">
        <input class="modal__url" list="modal-pines" placeholder="Pin" id="modal-pin" value="${
          data && data.pin ? data.pin : ""
        }"/>
        <datalist class="modal__datalist" id="modal-pines">
            <option>A0</option>
            <option>A1</option>
            <option>A2</option>
            <option>A3</option>
            <option>A4</option>
            <option>A5</option>
            <option>A6</option>
            <option>A7</option>
            <option>A8</option>
            <option>A9</option>
            <option>D0</option>
            <option>D1</option>
            <option>D2</option>
            <option>D3</option>
            <option>D4</option>
            <option>D5</option>
            <option>D6</option>
            <option>D7</option>
            <option>D8</option>
            <option>D9</option>
            <option>D10</option>
            <option>D11</option>
            <option>D12</option>
            <option>D13</option>
            <option>DAC0</option>
            <option>DAC1</option>
            <option>DAC3</option>
            <option>PWM</option>
            <option>PWM1</option>
            <option>PWM2</option>
            <option>PWM3</option>
            <option>PWM4</option>
            <option>PWM5</option>
            <option>PWM6</option>
        </datalist>
        <input class="modal__url" list="modal-boards" placeholder="Board" id="modal-board" value="${
          data && data.board ? data.board : ""
        }" />
        <datalist class="modal__datalist" id="modal-boards">
            <option>ESP8266</option>
            <option>ESP32</option>
            <option>Arduino Uno</option>
            <option>Arduino Mega</option>
            <option>Arduino Mini </option>
        </datalist>
    </header>
    <div class="card__body modal__body">
        <div class="modal__body__top">
            <div class="input__color">
              <div><label for="modal-color-on">ON</label><input type="color" name="" value="${
                data && data.thingColor.colorOn
                  ? data.thingColor.colorOn
                  : "#FFD600"
              }" id="modal-color-on" /></div>
              <div><label for="modal-color-off">OFF</label><input type="color" name="" value="${
                data && data.thingColor.colorOff
                  ? data.thingColor.colorOff
                  : "#BDBDBD"
              }" id="modal-color-off" />
            </div> </div>
            <div class="${
              data && data.icon ? data.icon.iconOn : "icon-bulb"
            } icons-size icns-yellow" id="modal-icon" style="color:${
    data && data.thingColor.colorOn ? data.thingColor.colorOn : ""
  }">
              ${data && data.icon.input ? getInput(data) : ""}
            </div>
            <input class="modal__url" list="modal-subfijes" id="modal-subfije" ${
              data && data.subfije ? data.subfije : ""
            } />
            <datalist class="modal__datalist" id="modal-subfijes">
              <option>(Empty)</option>
              <option>ºC</option>
              <option>ºF</option>
              <option>mV</option>
              <option>V</option>
              <option>mA</option>
              <option>A</option>
            </datalist>
        </div>
        <div class="modal__body__button">
<select class="modal__select" name="" id="modal-thing">
  <option ${
    data && data.thing && data.thing == "bulb" ? "selected" : ""
  } data-input="" data-color="#FFD600" data-icon-off="" data-icon-on="icon-bulb" data-class="" value="bulb">Bulb</option> 
  <option ${
    data && data.thing && data.thing == "fan" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="" data-icon-on="icon-fan" data-class="animate-spin" value="fan">Fan</option>
  <option ${
    data && data.thing && data.thing == "cam" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="" data-icon-on="icon-videocam" data-class="" value="cam">Cam</option>
  <option ${
    data && data.thing && data.thing == "current" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="" data-icon-on="icon-flash" data-class="" value="current">Current</option>
  <option ${
    data && data.thing && data.thing == "lock" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="icon-lock-open" data-icon-on="icon-lock" data-class="" value="lock">Lock</option>
  <option ${
    data && data.thing && data.thing == "person" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="" data-icon-on="icon-account-alert" data-class="" value="person">Person</option>
  <option ${
    data && data.thing && data.thing == "switch" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="icon-toggle-switch-off" data-icon-on="icon-toggle-switch" data-class="" value="switch">Switch</option>
  <option ${
    data && data.thing && data.thing == "toggle" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="icon-toggle-off" data-icon-on="icon-toggle-on" data-class="" value="toggle">Toggle</option>
  <option ${
    data && data.thing && data.thing == "key" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="" data-icon-on="icon-key" data-class="" value="key">Key</option>
  <option ${
    data && data.thing && data.thing == "batery" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="icon-battery-0" data-icon-on="icon-battery-4" data-class="" value="batery">Batery</option>
  <option ${
    data && data.thing && data.thing == "bluetooth" ? "selected" : ""
  } data-input="" data-color="#3949AB" data-icon-off="" data-icon-on="icon-bluetooth" data-class="" value="bluetooth">Bluetooth</option>
  <option ${
    data && data.thing && data.thing == "thermometer" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="" data-icon-on="icon-thermometer" data-class="" value="thermometer">Thermometer</option>
  <option ${
    data && data.thing && data.thing == "a/c" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="" data-icon-on="icon-snow" data-class="" value="a/c">A/C</option>
  <option ${
    data && data.thing && data.thing == "motor" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="icn-motor-dc" data-icon-on="icn-motor-dc-fill" data-class="" value="motor">Motor</option>
  <option ${
    data && data.thing && data.thing == "car" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="" data-icon-on="icon-car" data-class="" value="car">Car</option>
  <option ${
    data && data.thing && data.thing == "value" ? "selected" : ""
  } data-input="" data-color="" data-icon-off="" data-icon-on="icon-text" data-class="" value="value">Value</option>
  <option ${
    data && data.thing && data.thing == "textarea" ? "selected" : ""
  } data-input="textarea" data-color="" data-icon-off="" data-icon-on="" data-class="" value="textarea">Text Area</option>
  <option ${
    data && data.thing && data.thing == "slider" ? "selected" : ""
  } data-input="range" data-color="" data-icon-off="" data-icon-on="" data-class="" value="slider">Slider</option>
  <option ${
    data && data.thing && data.thing == "input" ? "selected" : ""
  } data-input="text" data-color="" data-icon-off="" data-icon-on="" data-class="" value="input">Input Text</option>
  <option ${
    data && data.thing && data.thing == "color" ? "selected" : ""
  } data-input="color" data-color="" data-icon-off="" data-icon-on="" data-class="" value="color">Color picker</option>
  <option ${
    data && data.thing && data.thing == "logger" ? "selected" : ""
  } data-input="textarea" data-color="" data-icon-off="" data-icon-on="" data-class="logger" value="logger">Logger</option>
</select>
          <input class="modal__url" type="text" placeholder="Ligth Room" id="modal-input-description" value="${
            data && data.description ? data.description : ""
          }"/>
        </div>
    </div>
    <footer class="card__footer modal__card__footer">
        <div class="modal__card__footer__topic">
          <input class="modal__url" type="url" placeholder="Subscribe Topic" title="topic" id="topic-subscribe" value="${
            data && data.topic.subscribe.topic ? data.topic.subscribe.topic : ""
          }"/>
        <div class="modal__card__footer__playload"><input class="modal__url" type="text" placeholder="playload on" id="payload-subscribe-on" value="${
          data && data.topic.subscribe.payloadOn
            ? data.topic.subscribe.payloadOn
            : ""
        }"/><input class="modal__url" type="text" placeholder="payload off" id="payload-subscribe-off" value="${
    data && data.topic.subscribe.payloadOff
      ? data.topic.subscribe.payloadOff
      : ""
  }"/></div>
        <input class="modal__url" type="url" placeholder="Pubish Topic" title="topic" id="topic-publish" value="${
          data && data.topic.publish.topic ? data.topic.publish.topic : ""
        }"/>
        <div class="modal__card__footer__playload"><input class="modal__url" type="text" placeholder="payload on" id="payload-publish-on" value="${
          data && data.topic.publish.payloadOn
            ? data.topic.publish.payloadOn
            : ""
        }"/><input class="modal__url" type="text" placeholder="payload off" id="payload-publish-off" value="${
    data && data.topic.subscribe.payloadOff
      ? data.topic.subscribe.payloadOff
      : ""
  }"/></div>
        </div>
        <div class="card__footer__btn"><label class="switch"><input type="checkbox" ${
          data ? (data.status ? "checked" : "") : "checked"
        } checked id="modal-subscribe" /><span class="slider round"> </span></label></div>
    </footer>
    <div class="modal__btns">
      <a class="btn btn__cancel" href="/" id="modal-cancel">Cancel</a>
      <a class="btn btn__ok" href="/" id="modal-ok">Agregar</a>
    </div>
</div>
</div>
`;
};
