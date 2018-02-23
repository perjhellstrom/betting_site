
function DetailedMatchWindow(element) {
    this.element = element;
    this.position = {
        left: 0, 
        top: 0
    };
    this.scroll = {
        left: 0, 
        top: 0
    };
    this.isVisible = false;

    this.hide = function() {
        this.element.style.visibility = "hidden";
        this.isVisible = false;
    }

    this.show = function() {
        this.element.style.visibility = "visible";
        this.isVisible = true;
    }

    this.updatePositon = function() {
        this.element.style.left = (this.position.left - this.scroll.left) + "px";
        this.element.style.top = (this.position.top - this.scroll.top) + "px";
    }

    this.updateInformation = function(element) {
        var teamContainer = element.children[0];
        for (var index = 0; index < 2; index++) {
            var innerText = teamContainer.children[index].children[0].innerText;
            this.element.children[index].innerText = innerText;
        }
    }

    this.positionIsSame = function(position) {
        return this.position.left === position.left && this.position.top === position.top;
    }
}

var detailedMatchWindow = new DetailedMatchWindow(document.getElementById("detailed-match"));
detailedMatchWindow.hide();

var getDocumentPosition = function(element) {
    var position = {
        left: element.offsetLeft, 
        top: element.offsetTop
    };
    var bodyElement = document.getElementsByTagName("body")[0];
    while (element.offsetParent) {
        position.left += element.offsetParent.offsetLeft;
        position.top += element.offsetParent.offsetTop;
        if (element === bodyElement) {
            break;
        }
        else {
            element = element.offsetParent;
        }
    }
    return position;
}

var hangRightOf = function(parentELement, position) {
    position.left += parentELement.offsetWidth;
    if (parentELement.children[0].style.top != "") {
        position.top += parseFloat(parentELement.children[0].style.top);  
    } else if (parentELement.children[0].style.bottom != "") {
        var matchHeight = parseFloat(parentELement.style.height);
        var teamContainerBottom = parseFloat(parentELement.children[0].style.bottom);
        position.top += matchHeight + teamContainerBottom;
    }
    return position;
}

var bracketData = {
	teams : [
		["Player 1", "Player 2"],
		["Player 3", "Player 4"],
		["Player 5", "Player 6"],
		["Player 7", "Player 8"],
	],
	results : [
		[
			[[1,2], [3,4], [5,6], [7,8]],
			[[9,10], [11,12]],
			[[13,14]]
		],
		[
			[[15,16], [17,18]],
			[[19,20], [21,22]],
			[[23,24]],
			[[25,26]],
		],
		[
			[[11, 12], [13, 14]],
			[[15, 16]]
		]
	]
}

var singleElimination = {
  "teams": [              // Matchups
    ["Team 1", "Team 2"], // First match
    ["Team 3", "Team 4"]  // Second match
  ],
  "results": [            // List of brackets (single elimination, so only one bracket)
    [                     // List of rounds in bracket
      [                   // First round in this bracket
        [1, 2],           // Team 1 vs Team 2
        [3, 4]            // Team 3 vs Team 4
      ],
      [                   // Second (final) round in single elimination bracket
        [5, 6],           // Match for first place
        [7, 8]            // Match for 3rd place
      ]
    ]
  ]
}
 
var doubleElimination = {
  "teams": [
    ["Team 1", "Team 2"],
    ["Team 3", "Team 4"]
  ],
  "results": [            // List of brackets (three since this is double elimination)
    [                     // Winner bracket
      [[1, 2], [3, 4]],   // First round and results
      [[5, 6]]            // Second round
    ],
    [                     // Loser bracket
      [[7, 8]],           // First round
      [[9, 10]]           // Second round
    ],
    [                     // Final "bracket"
      [                   // First round
        [11, 12],         // Match to determine 1st and 2nd
        [13, 14]          // Match to determine 3rd and 4th
      ],
      [                   // Second round
        [15, 16]          // LB winner won first round (11-12) so need a final decisive round
      ]
    ]
  ]
}

var onMatchClick = function(event) {
	var position = getDocumentPosition(this);
	position = hangRightOf(this, position);
	if (detailedMatchWindow.positionIsSame(position) && detailedMatchWindow.isVisible) {
		detailedMatchWindow.hide();
	} else {
		detailedMatchWindow.updateInformation(this);
		detailedMatchWindow.show();
	}
	detailedMatchWindow.position = position;
	detailedMatchWindow.updatePositon();
}

var readScroll = function(event) {
	detailedMatchWindow.scroll.top = document.documentElement.scrollTop;
	detailedMatchWindow.scroll.left = document.documentElement.scrollLeft;
	detailedMatchWindow.updatePositon();
}

window.addEventListener("load", function(event) {
	$("#bracket").bracket({
		init: bracketData, /* data to initialize the bracket with */
        //skipSecondaryFinal: true,
		teamWidth: 80
	});
	var matches = document.querySelectorAll(".match");
	for (var index = 0; index < matches.length; index++) {
		matches[index].addEventListener("click", onMatchClick);
	}
});

window.addEventListener("scroll", readScroll);
window.addEventListener("resize", readScroll);
