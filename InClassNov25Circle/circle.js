/**
 * @author John Pennock
 */


var app = angular.module('circleMod', [])
.factory("CircleFactory", function() {
	return {
		getAreaOfCircle: function(radius) {
			return (Math.PI*radius*radius);
		},
		getCircumference: function(radius) {
			return (Math.PI*radius*2);
		} 
	};
});