
var getTotalEntriesInStage = function(creationStage) {
    var stageGroups = creationStage.querySelectorAll(".group-frame");
    var numGroups = stageGroups.length;
    var groupEntryRows = stageGroups[0].querySelectorAll(".group-player-row");
    return groupEntryRows.length * numGroups;
};

var getNumAdvancingPlayersFromStage = function(creationStage) {
    var stageGroups = creationStage.querySelectorAll(".group-frame");
    var numGroups = stageGroups.length;
    var advancingPlayersPerGroup = getValueSettingValueWithinStage(creationStage, "Advancing Players");
    return advancingPlayersPerGroup * numGroups;
};

var createIssueOn = function(creationStage, issueInformation) {
    var creationIssueContainers = creationStage.querySelectorAll(".creation-issue-container");
    var issue = appendElementOn(creationIssueContainers[0], "div", "creation-issue");
    issue.innerText = "* " + issueInformation;
};

var validateStage = function(creationStage) {
    let creationIssueContainers = creationStage.querySelectorAll(".creation-issue-container");
    removeAllChildElementsWithSelector(creationIssueContainers[0], ".creation-issue");

    var numEntriesInThisStage = getTotalEntriesInStage(creationStage);
    if (creationStage.previousSibling) {
        let issueAdded = false;
        var numAdvancingPlayersFromPrecedingStage = getNumAdvancingPlayersFromStage(creationStage.previousSibling);
        if (numAdvancingPlayersFromPrecedingStage !== numEntriesInThisStage) {
            createIssueOn(creationStage, "Does not work with previous stage");
            issueAdded = true;
        }
        if (issueAdded) {
            creationIssueContainers[0].style.display = "block";
        } else {
            creationIssueContainers[0].style.display = "none";
        }
    }

    if (creationStage.nextSibling) {
        validateStage(creationStage.nextSibling);
    }
};