var mongoose = require('mongoose');
//go back up 2 folders and to controllers/cats rotues
var users = require('../controllers/users.js')
var questions = require('../controllers/questions.js')
var answers = require('../controllers/answers.js')

module.exports = function(app){
	//display all users
	app.get('/users', function (req, res){
	  users.index(req,res);
	})

	app.post('/users', function (req, res){
		users.create(req,res);
	})
	app.get('/questions', function (req, res){
	  questions.index(req,res);
	})

	app.post('/questions', function (req, res){
		console.log('req.body questions', req.body)
		questions.create(req,res);
	})
	app.get('/question/:id', function(req,res){
		console.log('req params in questions',req.params)
		questions.show(req,res);
	})
	app.post('/answers', function (req,res){
		console.log('req params in answer', req.body)
		answers.create(req,res);
	})

	app.get('/answers/:id/like', function(req,res){
		console.log('im in answer likes', req.params.id)
		answers.like(req,res);
	})
	

}


