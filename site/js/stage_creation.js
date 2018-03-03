
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

var addStage = function() {
    var groupBeforeBracketPage = document.getElementById("group-before-bracket-page");
    var creationStageContainer = groupBeforeBracketPage.querySelectorAll(".creation-stage-container")[0];
    
    var creationStage = appendElementOn(creationStageContainer, "div", "creation-stage");
    var creationStageHeader = appendElementOn(creationStage, "div", "creation-stage-header");
    creationStageHeader.innerText = "Group Stage " + creationStageContainer.children.length;

    var creationControlPanelColumn = appendElementOn(creationStage, "div", "creation-control-panel-column");
    var playerPerGroupPanel = appendElementOn(creationControlPanelColumn, "div", "creation-control-panel");
    var advancingPlayersPanel = appendElementOn(creationControlPanelColumn, "div", "creation-control-panel");
    var buttonPanel = appendElementOn(creationControlPanelColumn, "div", "creation-control-panel");

    createValueSettingOn(playerPerGroupPanel, "Players Per Group", 4);
    createValueSettingOn(advancingPlayersPanel, "Advancing Players", 1);

    var addGroupButton = appendElementOn(buttonPanel, "div", "creation-stage-button green-button");
    addGroupButton.innerText = "Add Group";
    addGroupButton.onclick = addGroup;

    var removeStageButton = appendElementOn(buttonPanel, "div", "creation-stage-button red-button");
    removeStageButton.innerText = "Remove Stage";
    removeStageButton.onclick = removeStage;

    appendElementOn(creationStage, "div", "group-stage-container");

    // Click the add group button to always have at least one group present in 
    // every group stage
    addGroupButton.click();
};

window.addEventListener("load", function(event) {
    var addStageButton = document.getElementById("add-stage");
    addStageButton.addEventListener("click", addStage);
    addStage();
});
