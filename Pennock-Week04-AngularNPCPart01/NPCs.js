/**
 * @author John Pennock (acknowledgment to Charlie Calvert's JSObjects\JavaScript\Design\AngBootUi)
 */

angular.module('pennprojedit', ['ui.bootstrap']);

function TableEditor($scope, $dialog) {

	$scope.NPCs = [{
		name : 'Lucy',
		hitPoints : 25,
		health : 32,
		totalMoves : 0
	}, {
		name : 'Saulti',
		hitPoints : 10,
		health : 11,
		totalMoves : 12
	}, {
		name : 'Cannius',
		hitPoints : 11,
		health : 12,
		totalMoves : 13
	}, {
		name : "Grog",
		hitPoints : 12,
		health : 13,
		totalMoves : 14
	}];

	var dialogOptions = {
		controller : 'EditCtrl',
		templateUrl : 'NPCEdit.html'
	};

	$scope.edit = function(npc) {

		var itemToEdit = npc;

		$dialog.dialog(angular.extend(dialogOptions, {
			resolve : {
				npc : angular.copy(itemToEdit)
			}
		})).open().then(function(result) {
			if (result) {
				angular.copy(result, itemToEdit);
			}
			itemToEdit = undefined;
		});
	};
}

// the dialog is injected in the specified controller
function EditCtrl($scope, npc, dialog) {

	$scope.npc = npc;

	$scope.save = function() {
		dialog.close($scope.npc);
	};

	$scope.close = function() {
		dialog.close(undefined);
	};
}