module.exports = /*html*/ `
<div class="modal" id="modal">
    <div class="card modal__card" id="card-">
        <header class="card__header"><input class="modal__url" list="modal-pines" placeholder="D0"
                id="modal-pin" /><datalist class="modal__datalist" id="modal-pines">
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
            </datalist><input class="modal__url" list="modal-boards" placeholder="ESP8266"
                id="modal-board" /><datalist class="modal__datalist" id="modal-boards">
                <option>ESP8266</option>
                <option>ESP32</option>
                <option>Arduino Uno</option>
                <option>Arduino Mega</option>
                <option>Arduino Mini</option>
            </datalist></header>
        <div class="card__body modal__body">
            <div class="modal__body__top"><input type="color" name="" value="#FFD600" id="modal-color" />
                <div class="icon-bulb icons-size icns-yellow" id="modal-icon"></div><input class="modal__url"
                    list="modal-subfijes" id="modal-subfije" /><datalist class="modal__datalist"
                    id="modal-subfijes">
                    <option>(Empty)</option>
                    <option>ºC</option>
                    <option>ºF</option>
                    <option>V</option>
                    <option>V</option>
                    <option>mV</option>
                </datalist>
            </div>
            <div class="modal__body__button"><select class="modal__select" name="" id="modal-thing">
                    <option value="bulb">Bulb</option>
                    <option value="fan">Fan</option>
                    <option value="cam">Cam</option>
                    <option value="current">Current</option>
                    <option value="lock">Lock</option>
                    <option value="presence">Presence</option>
                    <option value="switch">switch</option>
                    <option value="key">Key</option>
                    <option value="batery">batery</option>
                    <option value="bluetooth">Bluetooth</option>
                    <option value="thermometer">Thermometer</option>
                    <option value="airc">A/C</option>
                    <option value="motor">Motor</option>
                    <option value="slider">Slider</option>
                    <option value="input">Input Text</option>
                    <option value="input">Color picker</option>
                </select><input class="modal__url" type="text" placeholder="Ligth Room" /></div>
        </div>
        <footer class="card__footer"> <input class="modal__url" type="url" placeholder="topic" title="topic"
                id="modal-url" />
            <div class="card__footer__btn"><label class="switch"><input type="checkbox" checked=""
                        id="modal-subscribe" /><span class="slider round"></span></label></div>
        </footer>
        <div class="topic">
            <div class="topic__subscribe" id="topic-subscribe">topic-subscribe </div>
            <div class="topic__public" id="topci-publish">topci-publish </div>
        </div>
        <div class="modal__btns"><a class="btn btn__cancel" href="#" id="modal-cancel">Cancel</a><a
                class="btn btn__ok" href="#" id="modal-ok">Ok </a></div>
    </div>
</div>
`;
