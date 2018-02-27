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


var appendElementOn = function(parent, selector) {
    var element = document.createElement("div");
    element.setAttribute("class", selector);
    parent.appendChild(element);
    return element;
};

var groupsCreated = 0;

var onButtonClick = function(event) {
    var creationControlPanelElement = event.target.parentElement;
    var creationStage = creationControlPanelElement.parentElement;
    var groupStageContainerElement = creationStage.getElementsByClassName("group-stage-container")[0];

    var groupFrameElement = appendElementOn(groupStageContainerElement, "group-frame");

    var nameHeader = appendElementOn(groupFrameElement, "group-header");
    var dateHeader = appendElementOn(groupFrameElement, "group-sub-header");
    var statusHeader = appendElementOn(groupFrameElement, "group-sub-header");

    var groupLetter = String.fromCharCode(groupsCreated + 97).toUpperCase();
    groupsCreated += 1;

    nameHeader.innerText = "Group " + groupLetter;
    dateHeader.innerText = "Date";
    statusHeader.innerText = "-";

    for (var i = 0; i < 4; i++) {
        var playerRowContainer = appendElementOn(groupFrameElement, "group-player-row-container");
        var playerRow = appendElementOn(playerRowContainer, "group-player-row");

        var rank = appendElementOn(playerRow, "group-player-rank");
        var name = appendElementOn(playerRow, "group-player-name");
        var score = appendElementOn(playerRow, "group-player-score");
        var matches = appendElementOn(playerRow, "group-player-matches");
        
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
