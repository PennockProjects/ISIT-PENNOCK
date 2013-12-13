/**
 * @author Charlie Calvert
 */

// specs code
describe("TestGameboard", function() {'use strict';
	var gameBoard = null;
    
	beforeEach(function() {
		module('gameBoardMod');				
		module('gameWrapMod');
		module('elfGameMod');
		module('elfPlayer');				
	});
	
	beforeEach(inject(function($injector) {
		gameBoard = $injector.get('gameBoards');
	}));
	
	it("TestGameBoard Check ElfGame Width", inject(function(elfGameService) {
		var mapGrid = {
			width : 18,
			height : 12,
			tile : {
				width : 32,
				height : 32
			}
		};
		elfGameService.start(mapGrid);
		var actual = elfGameService.width();		
		expect(actual).toEqual(576);
	}));

	it("can get a gameBoard object", function()  {			
		expect(gameBoard).toNotEqual(null);
	});
	
	it("has 3 levels", function(){
		expect(gameBoard.length).toEqual(3);
	});
	
	it("board 1 row has default stats", function()  {			
		expect(gameBoard[0][0].length).toEqual(18);
	});

	it("board 1 col has default stats", function()  {			
		expect(gameBoard[0].length).toEqual(12);
	});

	it("board 1 has no values outside of 0-4", function()  {
		var fOutOfBounds = false;
		for(var i=0; i < gameBoard[0].length; i++) {
			for(var j=0; j < gameBoard[0][0].length; j++) {
				if((gameBoard[0][i][j] > 4) || (gameBoard[0][i][j] < 0) ) {
					fOutOfBounds = true;
				}				
			}
		}
		expect(fOutOfBounds).toBe(false);
	});
		
	it("board 2 row has default stats", function()  {			
		expect(gameBoard[1][0].length).toEqual(18);
	});

	it("board 2 col has default stats", function()  {			
		expect(gameBoard[1].length).toEqual(12);
	});

	it("board 2 has no values outside of 0-4", function()  {
		var fOutOfBounds = false;
		for(var i=0; i < gameBoard[1].length; i++) {
			for(var j=0; j < gameBoard[1][0].length; j++) {
				if((gameBoard[1][i][j] > 4) || (gameBoard[1][i][j] < 0) ) {
					fOutOfBounds = true;
				}				
			}
		}
		expect(fOutOfBounds).toBe(false);
	});
	
	it("board 3 row has default stats", function()  {			
		expect(gameBoard[2][0].length).toEqual(18);
	});
	
	it("board 3 col has default stats", function()  {			
		expect(gameBoard[2].length).toEqual(12);
	});

	it("board 3 has no values outside of 0-4", function()  {
		var fOutOfBounds = false;
		for(var i=0; i < gameBoard[2].length; i++) {
			for(var j=0; j < gameBoard[2][0].length; j++) {
				if((gameBoard[2][i][j] > 4) || (gameBoard[2][i][j] < 0) ) {
					fOutOfBounds = true;
				}				
			}
		}
		expect(fOutOfBounds).toBe(false);
	});
	
	it("board 1, row 5, col 5 has 0", function()  {			
		expect(gameBoard[0][5][5]).toEqual(0);
	});
	
	it("board 2, row 5, col 5 has 0", function()  {			
		expect(gameBoard[1][5][5]).toEqual(0);
	});

	it("board 3, row 5, col 5 has 0", function()  {			
		expect(gameBoard[2][5][5]).toEqual(0);
	});

});

