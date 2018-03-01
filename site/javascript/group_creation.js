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


var appendDivOn = function(parent, selector) {
    var element = document.createElement("div");
    element.setAttribute("class", selector);
    parent.appendChild(element);
    return element;
};

var appendInputOn = function(parent, type) {
    var element = document.createElement("input");
    element.setAttribute("type", type);
    element.required = true;
    parent.appendChild(element);
    return element;
};

var groupsCreated = 0;

var onButtonClick = function(event) {
    var creationControlPanelElement = event.target.parentElement;
    var creationStage = creationControlPanelElement.parentElement;
    var groupStageContainerElement = creationStage.getElementsByClassName("group-stage-container")[0];

    var groupFrameElement = appendDivOn(groupStageContainerElement, "group-frame");

    var nameHeader = appendDivOn(groupFrameElement, "group-header");
    var dateHeader = appendDivOn(groupFrameElement, "group-sub-header");
    var statusHeader = appendDivOn(groupFrameElement, "group-sub-header");

    var groupLetter = String.fromCharCode(groupsCreated + 97).toUpperCase();
    groupsCreated += 1;

    nameHeader.innerText = "Group " + groupLetter;
    appendInputOn(dateHeader, "date");
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
};

window.addEventListener("load", function(event) {
    var buttons = document.querySelectorAll(".creation-control-panel-button");
    for (var index = 0; index < buttons.length; index++) {
        buttons[index].addEventListener("click", onButtonClick);
    }
});
