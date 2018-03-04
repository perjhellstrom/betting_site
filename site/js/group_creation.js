
var defaultEntryName = "Player/Team";

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
    if (groupStageContainer.children.length > 1) {
        if (window.confirm("Do you really want to remove group?")) {
            groupStageContainer.removeChild(this.parentNode);
            groupFrame = groupStageContainer.children[1];
            groupLabeler.run(groupStageContainer);
        }
    }
};

var attemptInnerTextClear = function(event) {
    if (event.target.innerText === defaultEntryName) {
        event.target.innerText = "";
    }
};

var focusOnNextNameEntry = function(event) { 
    if (event.keyCode === 13) {
        var groupPlayerRowContainer = this.closest(".group-player-row-container");
        var nextElementSibling = groupPlayerRowContainer.nextElementSibling;
        if (nextElementSibling === null) {
            this.blur();
        } else {
            var groupPlayerName = nextElementSibling.querySelectorAll(".group-player-name")[0];
            groupPlayerName.focus();
        }
        return false;
    }
};

var getPlayerAmountInFirstGroup = function(groupStageContainer) {
    var firstGroupStageContainer = groupStageContainer.firstChild;
    var groupPlayerRowContainers = firstGroupStageContainer.querySelectorAll(".group-player-row-container");
    var playersInGroup = groupPlayerRowContainers[0].children.length;
    return playersInGroup;
};

var addPlayerRow = function(parentContainer) {
    var playerRow = appendDivOn(parentContainer, "group-player-row");
    var rank = appendDivOn(playerRow, "group-player-rank");
    var name = appendDivOn(playerRow, "group-player-name");
    var score = appendDivOn(playerRow, "group-player-score");
    var matches = appendDivOn(playerRow, "group-player-matches");

    name.setAttribute("contenteditable", "true");
    name.innerText = defaultEntryName;
    name.onclick = attemptInnerTextClear;
    name.onfocus = attemptInnerTextClear;
    name.onkeydown = focusOnNextNameEntry;

    rank.innerText = parentContainer.children.length;
    score.innerText = "-";
    matches.innerText = "-";
};

var addGroup = function(event) {
    var creationStage = event.target.closest(".creation-stage");
    var groupStageContainers = creationStage.querySelectorAll(".group-stage-container");
    var groupStageContainer = groupStageContainers[0];

    var groupContainer = appendDivOn(groupStageContainer, "creation-group-container");
    var groupFrameElement = appendDivOn(groupContainer, "group-frame");
    var removeGroupButton = appendDivOn(groupContainer, "creation-remove-group-button red-button");

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

    var playersInGroup = 4;
    var groupAmount = groupStageContainer.children.length;
    if (groupAmount > 1) {
        playersInGroup = getPlayerAmountInFirstGroup(groupStageContainer);
    }

    var playerRowContainer = appendDivOn(groupFrameElement, "group-player-row-container");
    for (var index = 0; index < playersInGroup; index++) {
        addPlayerRow(playerRowContainer);
    }

    groupLabeler.run(groupStageContainer);
};
