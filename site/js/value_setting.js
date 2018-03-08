

var changeValue = function(element, delta) {
    var valueSettingControlPanelValue = element.parentNode.querySelectorAll(".value-setting-control-panel-value")[0];
    var newValue = Number(valueSettingControlPanelValue.innerText) + delta;

    if (element.hasAttribute("data-callback")) {
        var callbackId = element.getAttribute("data-callback");
        window[callbackId](element, valueSettingControlPanelValue, newValue);
    }
};

var increaseValue = function() {
    changeValue(this, 1);
};

var decreaseValue = function() {
    changeValue(this, -1);
};

var createValueSettingOn = function(parent, label, initialValue, increaseCB="", decreaseCB="") {
    var valueSettingContainer = appendElementOn(parent, "div", "value-setting-container");

    appendElementOn(valueSettingContainer, "div", "value-setting-label").innerText = label;
    var valueSettingControlPanel = appendElementOn(valueSettingContainer, "div", "value-setting-control-panel");

    var valueSettingControlPanelIncrease = appendElementOn(valueSettingControlPanel, "div", "value-setting-control-panel-item");
    var valueSettingControlPanelValue = appendElementOn(valueSettingControlPanel, "div", "value-setting-control-panel-value");
    var valueSettingControlPanelDecrease = appendElementOn(valueSettingControlPanel, "div", "value-setting-control-panel-item");
    valueSettingControlPanelValue.innerText = initialValue;

    var valueSettingControlPanelIncreaseImage = appendElementOn(valueSettingControlPanelIncrease, "img", "green-button");
    var valueSettingControlPanelDecreaseImage = appendElementOn(valueSettingControlPanelDecrease, "img", "red-button");

    valueSettingControlPanelIncreaseImage.style.padding = "0 0 0 0";
    valueSettingControlPanelDecreaseImage.style.padding = "0 0 0 0";

    valueSettingControlPanelIncreaseImage.src = "../resources/pointer_up.png";
    valueSettingControlPanelDecreaseImage.src = "../resources/pointer_down.png";

    valueSettingControlPanelIncrease.onclick = increaseValue;
    valueSettingControlPanelDecrease.onclick = decreaseValue;

    if(increaseCB !== "") {
        valueSettingControlPanelIncrease.setAttribute("data-callback", increaseCB);
    }
    if(decreaseCB !== "") {
        valueSettingControlPanelDecrease.setAttribute("data-callback", decreaseCB);
    }
};