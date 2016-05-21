var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var QuestionSchema = new mongoose.Schema({
	question : {type: String, min: 10},
	answers : [{type: mongoose.Schema.Types.ObjectId, ref:'Answer'}],
	description: {type: String},
	_creator : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
	},
	{
		timestamps: true
	})

QuestionSchema.path('question').required(true, "Question must be at least 10 characters");

var Question = mongoose.model("Question", QuestionSchema);

QuestionSchema.plugin(deepPopulate);