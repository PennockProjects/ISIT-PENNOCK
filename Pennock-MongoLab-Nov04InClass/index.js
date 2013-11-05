/**
 * @author Charlie Calvert
 */


angular.module('elvenApp', ['pres'])
.controller('MyController', function($scope, $http, presidents) {
    $scope.hint = "<p>Start with <strong>node server.js</strong> to retrieve JSON from Server</p>";
    
    // $scope.presidents = presidents;
    $scope.presidentsList = presidents.query({}, function(users){
    	$scope.presidentsLength = $scope.presidentsList.length;
      console.log($scope.presidentsList.length);
    });
	
	var getDataJson = $http.get('data.json');

	getDataJson.success(function(data, status, headers, config)  {
		$scope.data = data;
	});
	
	getDataJson.error(function(data, status, headers, config) {
		throw new Error('Oh no! An Error!');
	});

});

angular.module('pres', ['ngResource'])
.factory('presidents', function($resource) {
	console.log('Presidents factory called');
	var Presidents = $resource('https://api.mongolab.com/api/1/databases/isit-pennock-azure/collections/Foo/:id', {
      // apiKey:'4fb51e55e4b02e56a67b0b66',
      apiKey:'71ejxCBh0JLNKgPlLcFgDD1Ppv_e-wYE',
      id:'@_id.$oid'
    });

    Presidents.prototype.getPresidentName = function() {
      return this.presidentName;
    };
    
    Presidents.prototype.getTermStart = function() {
    	return this.termStart;
    };

    return Presidents;    
	 
	// return { a: 2 };		
});
