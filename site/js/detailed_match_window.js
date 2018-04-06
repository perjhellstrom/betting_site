
function DetailedMatchWindow(element) {
    this.element = element;
    this.position = {
        left: 0, 
        top: 0
    };
    this.scroll = {
        left: 0, 
        top: 0
    };
    this.isVisible = false;

    this.hide = function() {
        this.element.style.visibility = "hidden";
        this.isVisible = false;
    }

    this.show = function() {
        this.element.style.visibility = "visible";
        this.isVisible = true;
    }

    this.updatePositon = function() {
        this.element.style.left = (this.position.left - this.scroll.left) + "px";
        this.element.style.top = (this.position.top - this.scroll.top) + "px";
    }

    this.updateInformation = function(element) {
        var teamContainer = element.children[0];
        for (var index = 0; index < 2; index++) {
            var innerText = teamContainer.children[index].children[0].innerText;
            this.element.children[index].innerText = innerText;
        }
    }

    this.positionIsSame = function(position) {
        return this.position.left === position.left && this.position.top === position.top;
    }
}

var detailedMatchWindow = new DetailedMatchWindow(document.getElementById("detailed-match"));
detailedMatchWindow.hide();

var getDocumentPosition = function(element) {
    var position = {
        left: element.offsetLeft, 
        top: element.offsetTop
    };
    var bodyElement = document.getElementsByTagName("body")[0];
    while (element.offsetParent) {
        position.left += element.offsetParent.offsetLeft;
        position.top += element.offsetParent.offsetTop;
        if (element === bodyElement) {
            break;
        }
        else {
            element = element.offsetParent;
        }
    }
    return position;
}

var hangRightOf = function(parentELement, position) {
    position.left += parentELement.offsetWidth;
    if (parentELement.children[0].style.top != "") {
        position.top += parseFloat(parentELement.children[0].style.top);  
    } else if (parentELement.children[0].style.bottom != "") {
        var matchHeight = parseFloat(parentELement.style.height);
        var teamContainerBottom = parseFloat(parentELement.children[0].style.bottom);
        position.top += matchHeight + teamContainerBottom;
    }
    return position;
}

var onMatchClick = function(event) {
	var position = getDocumentPosition(this);
	position = hangRightOf(this, position);
	if (detailedMatchWindow.positionIsSame(position) && detailedMatchWindow.isVisible) {
		detailedMatchWindow.hide();
	} else {
		detailedMatchWindow.updateInformation(this);
		detailedMatchWindow.show();
	}
	detailedMatchWindow.position = position;
	detailedMatchWindow.updatePositon();
}

var onScrollUpdate = function(event) {
	detailedMatchWindow.scroll.top = document.documentElement.scrollTop;
	detailedMatchWindow.scroll.left = document.documentElement.scrollLeft;
	detailedMatchWindow.updatePositon();
}
