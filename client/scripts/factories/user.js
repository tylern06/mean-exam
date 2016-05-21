myAppModule.factory('userFactory', function($http){
	var users = [];
	var factory = {};
	var sessionUser = {loggedIn: false}


	factory.getUsers = function (callback){
		$http.get('/users').success(function(output){
			// console.log("output from get Users", output)
			callback(output);
		})
	}

	factory.getUser = function(id, callback){
		console.log('user id in get user', id)
		$http.get('/users/' + id).success(function(output){
			console.log('found user in output', output)
			callback(output)
		})
	}

	factory.addUser = function (data,callback){
		console.log('user in add user factory', data)
		//pass JSON data from form
		$http.post('/users',data).success(function(output){
			console.log('add user output', output)
			//set session to true if user is added successfully
			if(output.status){
				sessionUser = output.sessionUser;
			}
			callback(output)
		})
	}

	factory.getSession = function(callback){
		callback(sessionUser)
	}

	factory.setSession = function(data){
		// sessionUser = {loggedIn: true, name: data.name, user_id: data._id}
		data.loggedIn = true;
		sessionUser = data
		console.log('sessionUser in set user', sessionUser)
	}

	factory.clearSession = function(){
		sessionUser = {loggedIn: false}
	}

	return factory;
})
