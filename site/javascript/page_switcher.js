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

var enablePage = function(id) {
    document.getElementById(id).style.display = "block";
}

var enableCurrentTabPage = function(tabId) {
    switch (tabId) {
        case "tournaments-button":
            enablePage("tournaments-page");
            break;
        case "create-tournament-button":
            enablePage("create-tournament-page");
            break;
    }
}

var onTabClick = function(event) {
    deactivateTabs();
    disablePages();
    event.target.classList.add("tab-active");
    enableCurrentTabPage(event.target.id);
}

window.addEventListener("load", function(event) {
    var tabs = document.querySelectorAll(".tab");
    for (var index = 0; index < tabs.length; index++) {
        tabs[index].addEventListener("click", onTabClick);
    }

    deactivateTabs();
    disablePages();
    tabs[0].classList.add("tab-active");
    enableCurrentTabPage(tabs[0].id);
});
