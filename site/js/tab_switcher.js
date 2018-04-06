var activeTabId = "";

var deactivateTabs = function() {
    var tabs = document.querySelectorAll(".tab");
    for (var index = 0; index < tabs.length; index++) {
        tabs[index].classList.remove("tab-active");
    }
};

var disableTabs = function() {
    var tabContentContainers = document.querySelectorAll(".tab-content-container");
    for (var index = 0; index < tabContentContainers.length; index++) {
        tabContentContainers[index].style.display = "none";
    }
};

var enableTab = function(tabId) {
    var activeTabContentId = tabId + "-content";
    var tabContentElement = document.getElementById(activeTabContentId);
    tabContentElement.style.display = "block";
    appendBracketTo(tabContentElement)
}

var onTabClick = function(event) {
    var clickedTab = event.target;
    
    if(clickedTab.id === activeTabId) {
        return;
    }
    activeTabId = clickedTab.id;

    deactivateTabs();
    disableTabs();
    clickedTab.classList.add("tab-active");
    enableTab(activeTabId);
}
