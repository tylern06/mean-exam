var mongoose = require('mongoose');

var Question = mongoose.model('Question');
var User = mongoose.model('User');
var Answer = mongoose.model('Answer');
//required in the routes
module.exports = {
	create: function(req,res){
		Question.findOne({_id: req.body.question_id},function (err,question){
			if(err){
				console.log('error finding question', err)
				res.json({status:false, errors: err})
			}else{
				var answer = new Answer({
					answer: req.body.answer,
					description: req.body.description,
					_creator: req.body.creator_id,
					_question: req.body.question_id
				})
				answer.save(function (answer_err){
					if(answer_err){
						res.json({status:false, errors: answer_err})
					}else{
						console.log('answer saved succsufully')
						question.answers.push(answer._id)
						//save question after pushing the answer id
						question.save(function (question_err){
							if(question_err){
								res.json({status:false, errors: question_err})
							}else{
								User.findOne({_id:req.body.creator_id}, function (user_err, user){
									if(user_err){
										res.json({status:false, errors: user_err})
									}else{
										user.answers.push(req.body.answer._id)
										user.save(function (err){
											if(err){
												res.json({status:false, errors: err})
											}else{
												console.log('answer questions user saved succsufully')
												res.json({status:true})
											}
										})
									}
								})
							}
						})
					}
				})
			}
		})
	},
	like: function(req,res){
		Answer.update({_id: req.params.id}, {$inc: {likes: 1}}, function(err, answer){
			console.log('answer like in controller',answer)
			res.json(answer)
		})
	}
}
