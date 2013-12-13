/**
 * @author John Pennock
 */

/* jshint browser: true */

// Draw the initial game state
Crafty.scene('Game', function() {'use strict';

	if (!Crafty.fDebug) {
		angular.element(document.getElementById('textDisplay')).scope().level = Crafty.game.currentLevel;
		angular.element(document.getElementById('textDisplay')).scope().levelType = "Training Level ";
	}

	this.boards = Crafty.game.gameBoards;
	console.log("boards loaded for drawing");

	// A 2D array to keep track of all gameBoard tiles
	this.gameBoard = new Array(Crafty.game.map_grid.width);
	for (var i = 0; i < Crafty.game.map_grid.width; i++) {
		this.gameBoard[i] = new Array(Crafty.game.map_grid.height);
		for (var j = 0; j < Crafty.game.map_grid.height; j++) {
			this.gameBoard[i][j] = false;
		}
	}

	var createEntity = function(col, row, name, gameBoard) {
		var entity = Crafty.e(name).at(col, row);
		gameBoard[col][row] = true;
		return entity;
	};

	var createEntities = function(board, gameBoard) {
		for (var x = 0; x < Crafty.game.map_grid.width; x++) {
			for (var y = 0; y < Crafty.game.map_grid.height; y++) {
				var gridValue = board[y][x];
				if (gridValue === 1) {
					createEntity(x, y, 'Tree', gameBoard);
				} else if (gridValue === 2) {
					createEntity(x, y, 'Bush', gameBoard);
				} else if (gridValue === 3) {
					createEntity(x, y, 'Food', gameBoard);
				} else if (gridValue === 4) {
					var village = createEntity(x, y, 'Village', gameBoard);
					village.setName(village._entityName.replace('Entity', 'Planet'));
					Crafty.game.newVillage(village);
				}
			}
		}
	};

	createEntities(this.boards[Crafty.game.currentLevel], this.gameBoard);

	// Player character, placed at 5, 5 on our grid
	this.player = Crafty.e('PlayerCharacter').at(5, 5);
	this.gameBoard[this.player.at().x][this.player.at().y] = true;
	Crafty.game.newHero();

	// Show the victory screen once all villages are visisted
	this.show_victory = this.bind('VillageVisited', function() {
		Crafty.game.sendDebugMessage("Rebellious Planets Left: " + Crafty('Village').length);
		if (!Crafty('Village').length) {
			if (Crafty.game.currentLevel++ > 1) {
				Crafty.scene('TrainingOver');
			} else {
				Crafty.scene("Game");
			}
		}
	});
}, function() {'use strict';
	// Remove our event binding from above so that we don't
	//  end up having multiple redundant event watchers after
	//  multiple restarts of the game
	this.unbind('VillageVisited', this.show_victory);
});

// Victory scene : Announce victory, set up a new game
Crafty.scene('TrainingOver', function() {'use strict';
	// Display some text in celebration of the victory
	Crafty.e('2D, DOM, Text').attr({
		x : 0,
		y : 0
	}).text('Training done, All YOUR Base Belong To You!').textColor('#FFFFFF').textFont({
		size : '28px',
		weight : 'bold'
	});

	// restart the game when a key is pressed
	this.restart = function() {
		Crafty.scene('RealWorld');
		Crafty.game.currentLevel = 3;
	};

	// Bind keydown event. This was done wrong in the demo
	this.bind('KeyDown', this.restart);
}, function() {'use strict';
	// Remove key binding to prevent multiple restarts
	if (!this.unbind('KeyDown', this.restart)) {
		window.alert("Could not unbind");
	}

});

// Draw the initial game state
Crafty.scene('RealWorld', function() {'use strict';

	if (!Crafty.fDebug) {
		angular.element(document.getElementById('textDisplay')).scope().level = Crafty.game.currentLevel;
		angular.element(document.getElementById('textDisplay')).scope().levelType = "Real World Level ";
	}

	// A 2D array to keep track of all gameBoard tiles
	this.gameBoard = new Array(Crafty.game.map_grid.width);
	for (var i = 0; i < Crafty.game.map_grid.width; i++) {
		this.gameBoard[i] = new Array(Crafty.game.map_grid.height);
		for (var j = 0; j < Crafty.game.map_grid.height; j++) {
			this.gameBoard[i][j] = false;
		}
	}

	// Player character, placed at 5, 5 on our grid
	this.player = Crafty.e('PlayerCharacter').at(5, 5);
	this.gameBoard[this.player.at().x][this.player.at().y] = true;
	Crafty.game.newHero();

	// Place a tree at every edge square on our grid of 16x16 tiles
	for (var x = 0; x < Crafty.game.map_grid.width; x++) {
		for (var y = 0; y < Crafty.game.map_grid.height; y++) {
			var at_edge = x === 0 || x === Crafty.game.map_grid.width - 1 || y === 0 || y === Crafty.game.map_grid.height - 1;

			if (at_edge) {
				// Place a tree entity at the current tile
				Crafty.e('Tree').at(x, y);
				this.gameBoard[x][y] = true;
			} else if (Math.random() < 0.06 && !this.gameBoard[x][y]) {
				// Place a bush entity at the current tile
				Crafty.e('Bush').at(x, y);
				this.gameBoard[x][y] = true;
			} else if (Math.random() < 0.05 && !this.gameBoard[x][y]) {
				var food = Crafty.e('Food').at(x, y);
				this.gameBoard[x][y] = true;
			}
		}
	}

	// Generate up to five villages on the map in random locations
	var max_villages = 5 + Math.floor(Crafty.game.currentLevel / 5);
	var villagesCreated = 0;

	do {
		for (var col = 0; col < Crafty.game.map_grid.width; col++) {
			for (var row = 0; row < Crafty.game.map_grid.height; row++) {
				if (Math.random() < 0.02) {
					if (Crafty('Village').length < max_villages && !this.gameBoard[col][row]) {
						villagesCreated++;
						var village = Crafty.e('Village').at(col, row);
						village.setName(village._entityName.replace('Entity', 'Planet'));
						Crafty.game.newVillage(village);
					}
				}
			}
		}
	} while (villagesCreated === 0);

	// Show the victory screen once all villages are visisted
	this.show_victory = this.bind('VillageVisited', function() {
		Crafty.game.sendDebugMessage("Rebellious Planets Left: " + Crafty('Village').length);
		if (!Crafty('Village').length) {
			Crafty.game.currentLevel++;
			Crafty.scene('RealWorld');
		}
	});
}, function() {'use strict';
	// Remove our event binding from above so that we don't
	//  end up having multiple redundant event watchers after
	//  multiple restarts of the game
	this.unbind('VillageVisited', this.show_victory);
});

// Loser scene : set up new game
Crafty.scene('Failure', function() {'use strict';
	// Display some text in celebration of the victory
	Crafty.e('2D, DOM, Text').attr({
		x : 0,
		y : 0
	}).text('You are Dead! All Your Base Belong To Us').textColor('#FF0000').textFont({
		size : '28px',
		weight : 'bold'
	});

	Crafty.audio.play('base');

	// restart the game when a key is pressed
	this.restart = function() {
		Crafty.game.currentLevel = 0;
		Crafty.scene('Game');
	};

	// Bind keydown event. This was done wrong in the demo
	this.bind('KeyDown', this.restart);
}, function() {'use strict';
	// Remove key binding to prevent multiple restarts
	if (!this.unbind('KeyDown', this.restart)) {
		window.alert("Could not unbind");
	}

});

// Load binary assets such as images and audio files
Crafty.scene('Loading', function() {'use strict';

	var assets = ['Assets/spaceobjects.png', 'Assets/space.png', 'Assets/starbase.png', 'Assets/ship.png'];

	// Load our sprite map image
	Crafty.load(assets, function() {

		// Display text while loading
		Crafty.e('2D, DOM, Text').attr({
			x : 0,
			y : Crafty.viewport.height / 2 - 24,
			w : Crafty.viewport.width
		}).text('Loading...');

		Crafty.sprite(32, assets[0], {
			spr_tree : [2, 0],
			spr_bush : [3, 0],
			spr_village : [0, 0],
			// spr_food: [1, 0],
		});

		Crafty.sprite(32, 32, assets[2], {
			spr_food : [0, 0],
		}, 0, 0);

		//  The main character
		Crafty.sprite(32, 32, assets[3], {
			spr_mainCharacter : [0, 1],
		}, 0, 0);

		// Define our sounds for later use
		Crafty.audio.add({
			powerup : ['Assets/powerup01.mp3', 'Assets/powerup01.wav', 'Assets/powerup01.ogg'],
			sipup : ['Assets/beeps/beep-9.wav'],
			quelled : ['Assets/explosions/big/explosion-2.wav'],
			blast : ['Assets/explosions/small/explosion-1.wav'],
			defense : ['Assets/explosions/medium/explosion-1.wav'],
			knock : ["Assets/door_knock_3x.mp3"],
			base : ["Assets/BaseBelongToUs.mp3"]
		});

		// Now that our sprites are ready to draw, start the game
		Crafty.scene('Game');
	});
});
