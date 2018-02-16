
function DetailedMatchWindow(element) {
	this.element = element;
	this.position = {top:0, left:0};
	this.scroll = {top:0, left:0};
	this.isVisible = false;

	this.hide = function() {
		this.element.style.visibility = "hidden";
		this.isVisible = false;
	}

	this.show = function() {
		this.element.style.visibility = "visible";
		this.isVisible = true;
	}

	this.update = function() {
		this.element.style.top = (this.position.top - this.scroll.top) + "px";
		this.element.style.left = (this.position.left - this.scroll.left) + "px";
	}

	this.positionIsSame = function(position) {
		return this.position.top == position.top && this.position.left == position.left;
	}
}

var buildDetailedMatchWindow = function(bracketMatch) {
	for(var index = 0; index < bracketMatch.children.length; index++)
	{
		var detailedMath = document.getElementById("detailed-match");
		detailedMath.children[index].innerText = bracketMatch.children[index].innerText;
	}
}

var detailedMatchWindow = new DetailedMatchWindow(document.getElementById("detailed-match"));
detailedMatchWindow.hide();

var onBracketMatchClick = function() {
	var position = {top:this.offsetTop, left:this.offsetLeft};
	position.left += this.offsetWidth;
	if (detailedMatchWindow.positionIsSame(position) && detailedMatchWindow.isVisible) {
		detailedMatchWindow.hide();
	} else {
		detailedMatchWindow.show();
		buildDetailedMatchWindow(this);
	}
	detailedMatchWindow.position = position;
	detailedMatchWindow.update();
}

var bracketMatches = document.querySelectorAll(".bracket-match");
for (var index = 0; index < bracketMatches.length; index++) {
	bracketMatches[index].addEventListener("click", onBracketMatchClick);
}

window.addEventListener('scroll', function(event) {
	detailedMatchWindow.scroll.top = document.documentElement.scrollTop;
	detailedMatchWindow.scroll.left = document.documentElement.scrollLeft;
	detailedMatchWindow.update();
});

window.addEventListener('resize', function(event) {
	detailedMatchWindow.scroll.top = document.documentElement.scrollTop;
	detailedMatchWindow.scroll.left = document.documentElement.scrollLeft;
	detailedMatchWindow.update();
});