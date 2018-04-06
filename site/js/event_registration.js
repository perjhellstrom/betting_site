
window.addEventListener("load", function(event) {

  // detailed_math_window

  var matches = document.querySelectorAll(".match");
  for (var index = 0; index < matches.length; index++) {
    matches[index].addEventListener("click", onMatchClick);
  }

  // stage_creation

  var addStageButton = document.getElementById("add-stage");
  addStageButton.addEventListener("click", addGroupStage);
  addGroupStage();

  // tab_switcher

  var tabs = document.querySelectorAll(".tab");
  for (var index = 0; index < tabs.length; index++) {
    tabs[index].addEventListener("click", onTabClick);
  }

  deactivateTabs();
  disablePages();
  enablePage("tournament-page");

});

window.addEventListener("scroll", onScrollUpdate);
window.addEventListener("resize", onScrollUpdate);
