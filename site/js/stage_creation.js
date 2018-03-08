var getValueSettingValueWithinStage = function(creationStage, label) {
    var valueSettingContainers = creationStage.querySelectorAll(".value-setting-container");
    for (var index = 0; index < valueSettingContainers.length; index++) {
        var valueSettingLabel = valueSettingContainers[index].firstChild;
        if (valueSettingLabel.innerText === label) {
            return Number(valueSettingContainers[index].children[1].innerText);
        }
    }
    return -1;
};

var fixStageNames = function(creationStageContainer) {
    var creationStageHeaders = creationStageContainer.querySelectorAll(".creation-stage-header");
    console.log(creationStageHeaders);
    for (var index = 0; index < creationStageHeaders.length; index++) {
        creationStageHeaders[index].innerText = "Group Stage " + (index + 1);
    }
}

var removeStage = function() { 
    var creationStage = this.closest(".creation-stage");
    var creationStageContainer = creationStage.parentNode;
    if (creationStageContainer.children.length > 1) {
        if (window.confirm("Do you really want to remove group stage?")) {
            creationStageContainer.removeChild(creationStage);
        }
        fixStageNames(creationStageContainer);
    }
}

var playersPerGroupCallback = function(element, target, value) {
    if (value < 2) {
        value = 2;
    }

    var creationStage = element.closest(".creation-stage");
    var groupPlayerRowContainers = creationStage.querySelectorAll(".group-player-row-container");
    for (var containerIndex = 0; containerIndex < groupPlayerRowContainers.length; containerIndex++) {
        var currentContainer = groupPlayerRowContainers[containerIndex];
        while (currentContainer.children.length !== value) {
            if (currentContainer.children.length > value) {
                currentContainer.removeChild(currentContainer.lastChild);
            } else if (currentContainer.children.length < value) {
                addPlayerRow(currentContainer);
            }
            fixGroupBottomBorder(currentContainer);
        }
    }

    target.innerText = value;
    validateStage(creationStage);
}

var advancingPlayersCallback = function(element, target, value) {
    var min = 1;
    var max = Number.MAX_VALUE;

    var creationStage = element.closest(".creation-stage");
    var valueSettingValue = getValueSettingValueWithinStage(creationStage, "Players Per Group");
    if (valueSettingValue !== -1) {
        max = valueSettingValue - 1;
    }

    if (value > max) {
        value = max;
    } else if (value < min) {
        value = min;
    }

    target.innerText = value;
    validateStage(creationStage);    
}

var addStage = function() {
    var groupBeforeBracketPage = document.getElementById("group-before-bracket-page");
    var creationStageContainer = groupBeforeBracketPage.querySelectorAll(".creation-stage-container")[0];
    
    var creationStage = appendElementOn(creationStageContainer, "div", "creation-stage");
    var creationStageHeader = appendElementOn(creationStage, "div", "creation-stage-header");
    creationStageHeader.innerText = "Group Stage " + creationStageContainer.children.length;

    var creationControlPanelColumn = appendElementOn(creationStage, "div", "creation-control-panel-column");
    var buttonPanel = appendElementOn(creationControlPanelColumn, "div", "creation-control-panel");
    var playerPerGroupPanel = appendElementOn(creationControlPanelColumn, "div", "creation-control-panel");
    var advancingPlayersPanel = appendElementOn(creationControlPanelColumn, "div", "creation-control-panel");

    createValueSettingOn(playerPerGroupPanel, "Players Per Group", 4, "playersPerGroupCallback", "playersPerGroupCallback");
    createValueSettingOn(advancingPlayersPanel, "Advancing Players", 1, "advancingPlayersCallback", "advancingPlayersCallback");

    var addGroupButton = appendElementOn(buttonPanel, "div", "creation-stage-button green-button");
    addGroupButton.innerText = "Add Group";
    addGroupButton.onclick = addGroup;

    var removeStageButton = appendElementOn(buttonPanel, "div", "creation-stage-button red-button");
    removeStageButton.innerText = "Remove Stage";
    removeStageButton.onclick = removeStage;

    appendElementOn(creationStage, "div", "group-stage-container");

    var creationIssueContainer = appendElementOn(creationStage, "div", "creation-issue-container");    
    creationIssueContainer.style.display = "none";
    var creationIssueHeader = appendElementOn(creationIssueContainer, "div", "creation-stage-header");
    creationIssueHeader.innerText = "Stage Issues";

    // Click the add group button to always have at least one group present in 
    // every group stage
    addGroupButton.click();
};

window.addEventListener("load", function(event) {
    var addStageButton = document.getElementById("add-stage");
    addStageButton.addEventListener("click", addStage);
    addStage();
});
