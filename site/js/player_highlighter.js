
var highlightAvailable = function(rowElement) {
    var groupFrameElement = rowElement.parentNode;
    var rowContainers = groupFrameElement.getElementsByClassName("group-player-row-container");
    
    var numHighlighted = 0;    
    for (var index = 0; index < rowContainers.length; index++) {
        if (rowContainers[index].children.length >= 2) {
            numHighlighted += 1;
        }
    }

    return numHighlighted < 2;
}

var onRowClick = function() {
    if (this.children.length == 1) {
        if (highlightAvailable(this)) {
            var highlightElement = document.createElement("div");
            highlightElement.setAttribute("class", "group-player-highlight");
            this.appendChild(highlightElement);
        }
    } else {
        this.removeChild(this.children[1]);
    }
}

window.addEventListener("load", function(event) {
    var rows = document.querySelectorAll(".group-player-row-container");
    for (var index = 0; index < rows.length; index++) {
        rows[index].addEventListener("click", onRowClick);
    }
});
