myAppModule.controller('usersController', function ($scope, userFactory, $routeParams, $location){
	//call factory object method getPlayer
	function getUsers(){
		userFactory.getUsers(function(data){
			$scope.users = data;
			console.log("scope users", data)
		})			
	}

	function getUser(){
		userFactory.getUser($routeParams.id,function(data){
			console.log('getUser in controller', data)
			$scope.user = data
		})
	}

 	function getSession(){
 		userFactory.getSession(function(data){
 			$scope.sessionUser = data;
 		})
 	}
 	getSession()
	getUsers()

	if($routeParams.id != null){
		console.log("route params id", $routeParams.id)
		getUser()
	}

	//$scope.addUser method is invoked by ng-Click
	$scope.addUser = function(){
		$scope.errors = [];
		console.log('users list before add', $scope.newUser)
		exist = $scope.users.map(function(obj) 
			{ 
				return obj.name; 
			}).indexOf($scope.newUser.name);
		console.log('index of name', exist)
		//checks if user name already exist
		if(exist == -1){
			userFactory.addUser($scope.newUser, function (data){
				console.log('data in add user', data)
				if(data.status == false){
					$scope.errors = data.errors
				} else{
					getSession()
					// console.log('logged in', $scope.session)
					$location.url('/dashboard')
				}
			})
			$scope.newUser = {};
			getSession()
			getUsers()	
		} else {
				// console.log('found user', $scope.users[exist])
				userFactory.setSession($scope.users[exist])
				getSession()
				$location.url('/dashboard')
				$scope.newUser = {};
			}
	}

	$scope.logout = function(){
		userFactory.clearSession()
		// getSession()
		$location.url('/')
	}
})