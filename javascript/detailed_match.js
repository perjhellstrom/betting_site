
function DetailedMatchWindow(element) {
	this.element = element;
	this.position = {top:0, left:0};
	this.scrollOffset = 0;
	this.isVisible = false;

	this.toggleVisibility = function() {
		this.isVisible = !this.isVisible;
		if (this.isVisible) {
			this.element.show();
		} else {
			this.element.hide();
		}
	}

	this.update = function() {
		this.element.css({top: this.position.top - this.scrollOffset, left: this.position.left});
	}

	this.setPosition = function(position) {
		this.position = position;
		this.update();
	}

	this.setScrollOffset = function(scrollOffset) {
		this.scrollOffset = scrollOffset;
		this.update();
	}
}

var detailedMatchWindow = new DetailedMatchWindow($("#detailed-match"));

$(".bracket-match").click(function() {
	detailedMatchWindow.setPosition($(this).position());
	detailedMatchWindow.toggleVisibility();
});

$(window).scroll(function() {
    detailedMatchWindow.setScrollOffset($(window).scrollTop());
});

$(window).resize(function() {
	detailedMatchWindow.setScrollOffset($(window).scrollTop());
});