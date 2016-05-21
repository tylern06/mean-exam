//import angular module
var	myAppModule = angular.module('myApp', ['ngRoute']);
myAppModule.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/login.html'
	})
	.when('/dashboard',{
		templateUrl: 'partials/dashboard.html'
	})
	//link from  #/new_questions a href
	.when('/new_question',{
		templateUrl: 'partials/new_question.html'
	})
	.when('/question/:id/new_answer',{
		templateUrl: 'partials/new_answer.html'
	})
	//access :id from $routeParams.id from usersController
	.when('/question/:id',{
		templateUrl: 'partials/show.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

myAppModule.filter("myFilter", function(){
	  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input, optional1, optional2) {

    var output;

    // Do filter work here

    return output;

  }
});








