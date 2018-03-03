
var fixStageNames = function(creationStageContainer) {
    var creationStageHeaders = creationStageContainer.querySelectorAll(".creation-stage-header");
    console.log(creationStageHeaders);
    for (var index = 0; index < creationStageHeaders.length; index++) {
        creationStageHeaders[index].innerText = "Group Stage " + (index + 1);
    }
}

var removeStage = function() { 
    if (window.confirm("Do you really want to remove group stage?")) {
        var creationStage = this.closest(".creation-stage");
        var creationStageContainer = creationStage.parentNode;
        if (creationStageContainer.children.length > 1) {
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

    var creationControlPanel = appendElementOn(creationStage, "div", "creation-control-panel");
    var playersPerGroupElement = appendElementOn(creationControlPanel, "div", "creation-control-panel-element");
    var advancingPlayersElement = appendElementOn(creationControlPanel, "div", "creation-control-panel-element");
    var addGroupElement = appendElementOn(creationControlPanel, "div", "creation-control-panel-element");
    var removeStageElement = appendElementOn(creationControlPanel, "div", "creation-control-panel-element");

    appendElementOn(playersPerGroupElement, "label", "").innerText = "Players per group:";
    var playersPerGroupInput = appendElementOn(playersPerGroupElement, "input", "");
    playersPerGroupInput.type = "number";
    playersPerGroupInput.min = "0";

    appendElementOn(advancingPlayersElement, "label", "").innerText = "Advancing players:";
    var advancingPlayersInput = appendElementOn(advancingPlayersElement, "input", "");
    advancingPlayersInput.type = "number";
    advancingPlayersInput.min = "0";

    var addGroupButton = appendElementOn(addGroupElement, "div", "green-button");
    addGroupButton.innerText = "Add Group";
    addGroupButton.onclick = addGroup;

    var removeStageButton = appendElementOn(removeStageElement, "div", "red-button");
    removeStageButton.innerText = "Remove Stage";
    removeStageButton.onclick = removeStage;

    appendElementOn(creationStage, "div", "group-stage-container");
};



window.addEventListener("load", function(event) {
    var addStageButton = document.getElementById("add-stage");
    addStageButton.addEventListener("click", addStage);
    addStage();
});
