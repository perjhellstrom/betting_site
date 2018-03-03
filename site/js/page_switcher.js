var deactivateTabs = function() {
    var tabs = document.querySelectorAll(".tab");
    for (var index = 0; index < tabs.length; index++) {
        tabs[index].classList.remove("tab-active");
    }
};

var disablePages = function() {
    var pages = document.querySelectorAll(".page");
    for (var index = 0; index < pages.length; index++) {
        pages[index].style.display = "none";
    }
};

var enablePage = function(tabId) {
    pageId = tabId.replace("tab", "page");
    document.getElementById(pageId).style.display = "block";
}

var onTabClick = function(event) {
    deactivateTabs();
    disablePages();
    event.target.classList.add("tab-active");
    enablePage(event.target.id);
}

window.addEventListener("load", function(event) {
    var tabs = document.querySelectorAll(".tab");
    for (var index = 0; index < tabs.length; index++) {
        tabs[index].addEventListener("click", onTabClick);
    }

    deactivateTabs();
    disablePages();
    document.getElementById("tournament-page").style.display = "block";
});
