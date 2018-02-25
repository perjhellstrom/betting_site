var appendElementOn = function(parent, selector) {
    var element = document.createElement("div");
    element.setAttribute("class", selector);
    parent.appendChild(element);
    return element;
};


var onButtonClick = function(event) {
    var creationControlPanelElement = event.target.parentElement;
    var creationStage = creationControlPanelElement.parentElement;
    var groupStageContainerElement = creationStage.getElementsByClassName("group-stage-container")[0];

    var groupFrameElement = appendElementOn(groupStageContainerElement, "group-frame");

    var nameHeader = appendElementOn(groupFrameElement, "group-header");
    var dateHeader = appendElementOn(groupFrameElement, "group-sub-header");
    var statusHeader = appendElementOn(groupFrameElement, "group-sub-header");

    nameHeader.innerText = "Name";
    dateHeader.innerText = "Date";
    statusHeader.innerText = "Status";

    for (var i = 0; i < 4; i++) {
        var playerRowContainer = appendElementOn(groupFrameElement, "group-player-row-container");
        var playerRow = appendElementOn(playerRowContainer, "group-player-row");

        var rank = appendElementOn(playerRow, "group-player-rank");
        var name = appendElementOn(playerRow, "group-player-name");
        var score = appendElementOn(playerRow, "group-player-score");
        var matches = appendElementOn(playerRow, "group-player-matches");
        
        rank.innerText = i + 1;
        name.innerText = "Enter a name...";
        score.innerText = "0";
        matches.innerText = "0";
    }
};

window.addEventListener("load", function(event) {
    var buttons = document.querySelectorAll(".creation-control-panel-button");
    for (var index = 0; index < buttons.length; index++) {
        buttons[index].addEventListener("click", onButtonClick);
    }
});
