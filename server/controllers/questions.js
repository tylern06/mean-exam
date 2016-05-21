var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
//instantiate Question model
var Question = mongoose.model('Question');
var User = mongoose.model('User');
var errors = []

module.exports = {
	index: function(req, res){
		Question.find({})
				 .deepPopulate("_creator")
				 .exec(function(err, question){
				 	console.log('all questions index', question)
				 	res.json(question)
				 })
	},
	create: function(req,res){
		console.log('create topic req.body', req.body)
		User.findOne({_id: req.body.creator_id}, function (err, user){
			var question = new Question({
			question: req.body.question, 
			description: req.body.description, 
			_creator: req.body.creator_id
		})
			question.save(function (question_err){
				if(question_err){
					res.json({status: false, errors: errors})
					// console.log('errors in create', errors)
				} else {
						console.log('question saved', question)
						//push the users associated topic ref
						user.questions.push(question._id)
						user.save(function (err){
							if(err){
								console.log('user err in question', err)
								res.json({status: false, errors: err})
							}else{
								res.json({status: true})
							}
						})//end of user save
				  }
			});//end of question save
		})
	},
	show: function(req,res){
		Question.findOne({_id: req.params.id})
				//populate creator, answers with the assocated object
				 .deepPopulate('_creator answers answers._creator answers.answer answers.description answers.likes')
				 .exec(function(err,question){
				 	if(err){
				 		console.log(err);
				 		res.json(err.errors)
				 	} else{
				 		console.log('question in show controller', question)
				 		console.log('the creater of question is ', question._creator.name)
				 		res.json(question)
				 	}
				})
	}
}
