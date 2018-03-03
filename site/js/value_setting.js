var increaseValue = function() {
    var valueSettingControlPanelValue = this.parentNode.querySelectorAll(".value-setting-control-panel-value")[0];
    valueSettingControlPanelValue.innerText = Number(valueSettingControlPanelValue.innerText) + 1;
};

var decreaseValue = function() {
    var valueSettingControlPanelValue = this.parentNode.querySelectorAll(".value-setting-control-panel-value")[0];
    var currentValue = Number(valueSettingControlPanelValue.innerText);
    if (currentValue > 1) {
        valueSettingControlPanelValue.innerText = currentValue - 1;    
    }    
};

var createValueSettingOn = function(parent, label, initialValue) {
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
};