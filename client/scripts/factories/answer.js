myAppModule.factory('answerFactory', function($http){
	var factory = {};

	factory.addAnswer = function (data,callback){
		//pass JSON data from form
		$http.post('/answers',data).success(function(output){
			console.log('add question output', output)
			$http.get('/questions').success(function(questions){
				callback(questions, output)
			})
		})
	}

	factory.like = function(answer_id, question_id, callback){
		$http.get('/answers/' + answer_id + '/like').success(function(data){
			$http.get('/question/' + question_id).success(function(question){
				callback(question)
			})
		})
	}
	return factory;
})