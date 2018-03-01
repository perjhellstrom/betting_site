
var editedElement = null;

var editText = function(){
    editedElement = $(this);
    var name = editedElement.text();
    editedElement.html('');
    $('<input></input>')
        .attr({
            'type': 'text',
            'name': 'fname',
            'id': 'editingElement',
            'value': name
        })
        .appendTo(editedElement);
    $('#editingElement').focus();
}

$('#fullname').click(editText);

$(document).on('blur','#editingElement', function(){
    var name = $(this).val();
    editedElement.text(name);
});

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
    var removeGroupButton = appendDivOn(groupContainer, "creation-remove-group-button");
    var groupFrameElement = appendDivOn(groupContainer, "group-frame");

    removeGroupButton.onclick = removeGroup;

    // Add right margin to whole group container instead of just group frame. This 
    // will solve flex-end issue with removeGroupButton.
    groupContainer.style.marginRight = "15px";
    groupFrameElement.style.marginRight = "0";

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
    var buttons = document.querySelectorAll(".creation-control-panel-button");
    for (var index = 0; index < buttons.length; index++) {
        buttons[index].addEventListener("click", addGroup);
    }
});
