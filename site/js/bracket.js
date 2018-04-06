
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

var appendBracketTo = function(parent) {
	var asd = parent.querySelectorAll(".bracket-container")[0];

    removeAllChildElementsWithSelector(asd, ".generated_bracket");
	bracketElement = appendElementOn(asd, "div", "generated_bracket");

	$(bracketElement).bracket({
		init: bracketData, /* data to initialize the bracket with */
        //skipSecondaryFinal: true,
		teamWidth: 80
	});
}
