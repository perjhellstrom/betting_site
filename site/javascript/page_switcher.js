
var onTabClick = function(event) {
    var tabs = document.querySelectorAll(".tab");
    for (var index = 0; index < tabs.length; index++) {
        tabs[index].classList.remove("tab-active");
    }
    event.target.classList.add("tab-active");
}

window.addEventListener("load", function(event) {
    var tabs = document.querySelectorAll(".tab");
    for (var index = 0; index < tabs.length; index++) {
        tabs[index].addEventListener("click", onTabClick);
    }
});
