var activeTabId = "";

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
    var activePage = tabId.replace("tab", "page");
    var pageElement = document.getElementById(activePage);
    pageElement.style.display = "block";
    appendBracketTo(pageElement)
}

var onTabClick = function(event) {
    var clickedTab = event.target;
    
    if(clickedTab.id === activeTabId) {
        return;
    }
    activeTabId = clickedTab.id;

    deactivateTabs();
    disablePages();
    clickedTab.classList.add("tab-active");
    enablePage(activeTabId);
}
