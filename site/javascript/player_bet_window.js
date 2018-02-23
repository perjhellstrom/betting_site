
var createHoverElement = function(x, y) {
    element = document.createElement("div");
    element.setAttribute("class", "group-player-hover");
    element.style.left = x + "px";
    element.style.top = y + "px";
    return element;
}

var hoverElement = null;

var onRowMouseEnter = function(event) {
    hoverElement = createHoverElement(event.clientX, event.clientY);
    this.appendChild(hoverElement);
}

var onRowMouseLeave = function(event) {
    if (hoverElement != null) {
        this.removeChild(hoverElement);
    }
}

var onRowMouseMove = function(event) {
    hoverElement.style.left = event.clientX + "px";
    hoverElement.style.top = event.clientY + "px";
}

window.addEventListener("load", function(event) {
    var rows = document.querySelectorAll(".group-player-row-container");
    for (var index = 0; index < rows.length; index++) {
        rows[index].addEventListener("mouseenter", onRowMouseEnter);
        rows[index].addEventListener("mouseleave", onRowMouseLeave);
        rows[index].addEventListener("mousemove", onRowMouseMove);
    }
});
