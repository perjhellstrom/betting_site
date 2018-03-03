
var addStage = function(event) {
    var groupBeforeBracketPage = document.getElementById("group-before-bracket-page");
    var creationStageContainer = groupBeforeBracketPage.querySelectorAll(".creation-stage-container")[0];
    
    var creationStage = appendElementOn(creationStageContainer, "div", "creation-stage");
    var creationHeaderSection = appendElementOn(creationStage, "section", "");
    var header = appendElementOn(creationHeaderSection, "h3", "");
    header.innerText = "Group Stage " + creationStageContainer.children.length;

    var creationControlPanel = appendElementOn(creationStage, "div", "creation-control-panel");
    var playersPerGroupElement = appendElementOn(creationControlPanel, "div", "creation-control-panel-element");
    var advancingPlayersElement = appendElementOn(creationControlPanel, "div", "creation-control-panel-element");
    var addGroupElement = appendElementOn(creationControlPanel, "div", "creation-control-panel-element");

    appendElementOn(playersPerGroupElement, "label", "").innerText = "Players per group:";
    var playersPerGroupInput = appendElementOn(playersPerGroupElement, "input", "");
    playersPerGroupInput.type = "number";
    playersPerGroupInput.min = "0";

    appendElementOn(advancingPlayersElement, "label", "").innerText = "Advancing players:";
    var advancingPlayersInput = appendElementOn(advancingPlayersElement, "input", "");
    advancingPlayersInput.type = "number";
    advancingPlayersInput.min = "0";

    var addGroupButton = appendElementOn(addGroupElement, "div", "green-button");
    addGroupButton.innerText = "Add group";
    addGroupButton.onclick = addGroup;

    appendElementOn(creationStage, "div", "group-stage-container");
};

addStage();
