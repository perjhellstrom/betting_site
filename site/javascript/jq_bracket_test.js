var minimalData = {
    teams : [
      ["Player 1", "Player 2"], /* first matchup */
      ["Player 3", "Player 4"], /* second matchup */
      ["Player 5", "Player 6"], /* first matchup */
      ["Player 7", "Player 8"],  /* second matchup */
      ["Player 9", "Player 10"], /* first matchup */
      ["Player 11", "Player 12"], /* second matchup */
      ["Player 13", "Player 14"], /* first matchup */
      ["Player 15", "Player 16"]  /* second matchup */
    ],
    results : [
      [[1,2], [3,4], [5,6], [7,8], [1,2], [3,4], [5,6], [7,8]],       /* first round */
      [[1,2], [3,4], [5,6], [7,8]],       /* first round */
      [[9,10], [11,12]],        /* second round */
      [[13,14], [15,16]]        /* second round */
    ]
  }
 
$(function() {
	$('#bracket').bracket({
		init: minimalData /* data to initialize the bracket with */
	});
});