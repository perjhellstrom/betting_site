
function DetailedMatchWindow(element) {
	this.element = element;
	this.position = {top:0, left:0};
	this.scroll = {top:0, left:0};
	this.isVisible = false;

	this.hide = function() {
		this.element.hide();
		this.isVisible = false;
	}

	this.show = function() {
		this.element.show();
		this.isVisible = true;
	}

	this.update = function() {
		this.element.css({
			top: this.position.top - this.scroll.top, 
			left: this.position.left - this.scroll.left
		});
	}

	this.positionIsSame = function(position) {
		return this.position.top == position.top && this.position.left == position.left;
	}
}

var buildDetailedMatchWindow = function(bracketMatch) {
	for(var index = 0; index < bracketMatch.children().length; index++)
	{
		$("#detailed-match").children()[index].innerText = bracketMatch.children()[index].innerText;
	}
}

var detailedMatchWindow = new DetailedMatchWindow($("#detailed-match"));
detailedMatchWindow.hide();

$(".bracket-match").click(function() {
	var position = $(this).position();
	position.left += $(this).width();
	if (detailedMatchWindow.positionIsSame(position) && detailedMatchWindow.isVisible) {
		detailedMatchWindow.hide();
	} else {
		detailedMatchWindow.show();
		buildDetailedMatchWindow($(this));
	}
	detailedMatchWindow.position = position;
	detailedMatchWindow.update();
});

$(window).scroll(function() {
	detailedMatchWindow.scroll.top = $(window).scrollTop();
	detailedMatchWindow.scroll.left = $(window).scrollLeft();
	detailedMatchWindow.update();
});

$(window).resize(function() {
	detailedMatchWindow.scroll.top = $(window).scrollTop();
	detailedMatchWindow.scroll.left = $(window).scrollLeft();
	detailedMatchWindow.update();
});