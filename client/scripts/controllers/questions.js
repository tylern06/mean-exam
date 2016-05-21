
myAppModule.controller('questionsController', function ($scope, userFactory, questionFactory, answerFactory, $routeParams, $location){
	
	var getSessionUser = function(){
		userFactory.getSession(function(data){
			console.log('data in get sessionUser', data)
			if(data.loggedIn){
				$scope.sessionUser = data
			}else{
				//redirect to login if session is false
				$location.url('/')
			}
		})
	}

	var getQuestions = function(){
		questionFactory.getQuestions(function(data){
			console.log('getQuestions data', data)
			$scope.questions = data
		})
	}
	var getQuestion = function(){
		var question_id = $routeParams.id
		questionFactory.getQuestion(question_id, function(data){
			console.log('getQuestion data', data)
			$scope.question = data
		})
	}
	//invoke sessionuser and get questions
	getSessionUser();
	getQuestions();

	//get question if $routeParams.id exist
	if ($routeParams.id != null){
		getQuestion()
	}
	$scope.addQuestion = function(){
		$scope.newQuestion.creator_id = $scope.sessionUser._id
		console.log('new question', $scope.newQuestion)
		questionFactory.addQuestion($scope.newQuestion, function(data){
			console.log('data in add question', data)
			if(data.status == false){
				errors = []
					console.log('something went wrong')
					for (var x in question_err.errors){
						errors.push(question_err.errors[x].message)
					}
					$scope.errors= errors
			}
		})
		$scope.newQuestion = {};
		$location.url('/dashboard')
	}

	$scope.addAnswer = function(question_id){
		$scope.newAnswer.creator_id = $scope.sessionUser._id
		$scope.newAnswer.question_id = question_id
		console.log('new answer', $scope.newAnswer)
		answerFactory.addAnswer($scope.newAnswer, function(data, status){
			console.log('data in add answer', data)
			$scope.questions = data;
		})
		$scope.newAnswer = {};
		$location.url('/dashboard')
	}
	
	$scope.likes = function(answer_id, question_id, creator_id){
		console.log('im in likes', answer_id)
		if(creator_id != $scope.sessionUser._id){
			answerFactory.like(answer_id, question_id, function (data){
				console.log('data from like', data)
				$scope.question = data
			})
		}
	}

	$scope.logout = function(){
		userFactory.clearSession()
		$location.url('/')
	}

})