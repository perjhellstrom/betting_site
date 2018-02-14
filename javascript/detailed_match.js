
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

var detailedMatchWindow = new DetailedMatchWindow($("#detailed-match"));

$(".bracket-match").click(function() {
	var position = $(this).position();
	position.left += $(this).width();
	if (detailedMatchWindow.positionIsSame(position) && detailedMatchWindow.isVisible) {
		detailedMatchWindow.hide();
	} else {
		detailedMatchWindow.show();
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