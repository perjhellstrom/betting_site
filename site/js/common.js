
var appendElementOn = function(parent, elementType, selector) {
    var element = document.createElement(elementType);
    element.setAttribute("class", selector);
    parent.appendChild(element);
    return element;
};

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

var getElementsWithinParent = function(elementOrigin, parentSelector, targetSelector) {
    var parent = elementOrigin.closest(parentSelector);
    return parent.querySelectorAll(targetSelector);
};

var removeAllChildElementsWithSelector = function(parent, targetSelector) {
    var targetChildren = parent.querySelectorAll(targetSelector);
    for (var index = 0; index < targetChildren.length; index++) {
        parent.removeChild(targetChildren[index]);
    }
};