/**
 * @author John Pennock
 */


var app = angular.module('triangleMod', [])
.factory("TriangleFactory", function(){
	
	return {
		getPythagorasC: function(a, b) {
			return (Math.sqrt(a*a+b*b));
		}
	};
	
});