var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
	answer : {type: String, min: 15},
	likes : {type: Number, default: 0},
	description: {type: String},
	_question : {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
	_creator : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	},
	{
		timestamps: true
	})

AnswerSchema.path('answer').required(true, "Answer must be at least 15 characters");

var Answer = mongoose.model("Answer", AnswerSchema);

