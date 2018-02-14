
function DetailedMatchWindow(element) {
	this.element = element;
	this.position = {top:0, left:0};
	this.scrollOffset = 0;

	this.hide = function() {
		this.element.hide();
	}

	this.show = function() {
		this.element.show();
	}

	this.update = function() {
		this.element.css({top: this.position.top - this.scrollOffset, left: this.position.left});
	}

	this.setPosition = function(position) {
		this.position = position;
		this.update();
	}

	this.positionIsSame = function(position) {
		return this.position.top == position.top && this.position.left == position.left;
	}

	this.setScrollOffset = function(scrollOffset) {
		this.scrollOffset = scrollOffset;
		this.update();
	}
}

var detailedMatchWindow = new DetailedMatchWindow($("#detailed-match"));

$(".bracket-match").click(function() {
	var position = $(this).position();
	if (detailedMatchWindow.positionIsSame(position)) {
		detailedMatchWindow.hide();
	} else {
		detailedMatchWindow.show();
	}
	detailedMatchWindow.setPosition(position);
});

$(window).scroll(function() {
    detailedMatchWindow.setScrollOffset($(window).scrollTop());
});

$(window).resize(function() {
	detailedMatchWindow.setScrollOffset($(window).scrollTop());
});