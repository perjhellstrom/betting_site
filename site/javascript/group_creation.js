
var editText = function(){
    var currentName = this.innerText;
    this.innerHTML = "";

    var input = document.createElement("input");
    //input.setAttribute("class", "background-color: red;");
    input.setAttribute("type", "text");
    input.setAttribute("value", currentName);
    this.appendChild(input);

    input.focus();
    input.onblur = function() {
        var editedEntry = this.parentNode;
        var newEntryName = this.value;
        editedEntry.innerHTML = "";
        editedEntry.innerText = newEntryName;
    };
};

function GroupLabeler() {
    this.groupsCreated = 0;

    this.getNextGroupLetter = function() {
        var groupLetter = String.fromCharCode(this.groupsCreated + 97).toUpperCase();
        this.groupsCreated += 1;
        return groupLetter;
    };

    this.run = function(groupStageContainer) {
        this.groupsCreated = 0;
        var nameHeaders = groupStageContainer.querySelectorAll(".group-header");
        for (var index = 0; index < nameHeaders.length; index++) {
            nameHeaders[index].innerText = "Group " + this.getNextGroupLetter();
        }
    };
}

var groupLabeler = new GroupLabeler();

var removeGroup = function() {
    var groupStageContainer = this.closest(".group-stage-container");
    groupStageContainer.removeChild(this.parentNode);
    groupFrame = groupStageContainer.children[1];
    groupLabeler.run(groupStageContainer);
};

var addGroup = function(event) {
    var creationStage = event.target.closest(".creation-stage");
    var groupStageContainer = creationStage.querySelectorAll(".group-stage-container");

    var groupContainer = appendDivOn(groupStageContainer[0], "creation-group-container");
    var groupFrameElement = appendDivOn(groupContainer, "group-frame");
    var removeGroupButton = appendDivOn(groupContainer, "creation-remove-group-button red-button no-select");

    removeGroupButton.innerText = "Remove Group";
    removeGroupButton.onclick = removeGroup;

    // Add margin to whole group container instead of just group frame. This 
    // will solve alignment issue with removeGroupButton.
    groupContainer.style.marginRight = "15px";
    groupContainer.style.marginBottom = "15px";
    groupFrameElement.style.marginRight = "0";
    groupFrameElement.style.marginBottom = "0";

    var nameHeader = appendDivOn(groupFrameElement, "group-header");
    var dateHeader = appendDivOn(groupFrameElement, "group-sub-header");
    var statusHeader = appendDivOn(groupFrameElement, "group-sub-header");

    appendInputOn(dateHeader, "date").style.marginRight = "4px";
    appendInputOn(dateHeader, "time");
    statusHeader.innerText = "Remaining: -";

    for (var i = 0; i < 4; i++) {
        var playerRowContainer = appendDivOn(groupFrameElement, "group-player-row-container");
        var playerRow = appendDivOn(playerRowContainer, "group-player-row");

        var rank = appendDivOn(playerRow, "group-player-rank");
        var name = appendDivOn(playerRow, "group-player-name");
        var score = appendDivOn(playerRow, "group-player-score");
        var matches = appendDivOn(playerRow, "group-player-matches");
        
        rank.innerText = i + 1;
        name.innerText = "Player/Team";
        name.onclick = editText;
        score.innerText = "-";
        matches.innerText = "-";
    }

    groupLabeler.run(groupStageContainer[0]);
};

window.addEventListener("load", function(event) {
    var addGroupButton = document.getElementById("add-group-button");
    addGroupButton.addEventListener("click", addGroup);
});
