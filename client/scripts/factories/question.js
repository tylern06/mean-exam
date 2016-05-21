myAppModule.factory('questionFactory', function($http){
	var factory = {};

	
	factory.getQuestions = function (callback){
		$http.get('/questions').success(function(output){
			// console.log("output from get questions", output)
			questions = output
			callback(questions);
		})
	}

	factory.getQuestion = function(data, callback){
		$http.get('/question/' + data).success(function(output){
			question = output
			console.log('show question factory', question)
			callback(question)
		})
	}
	factory.addQuestion = function (data,callback){
		//pass JSON data from form
		$http.post('/questions',data).success(function(output){
			console.log('add question output', output)
			callback(output)
		})
	}
	return factory;
})