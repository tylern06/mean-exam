var mongoose = require('mongoose');
//create user shema
var UserSchema = new mongoose.Schema({
	name: {type: String},
	questions: [ {type: mongoose.Schema.Types.ObjectId, ref:'Question'} ],
	answers: [ {type: mongoose.Schema.Types.ObjectId, ref:'Answer'} ]
	},
	{
		timestamps: true
	})

UserSchema.path("name").required(true, "Name cannot be blank");

mongoose.model("User", UserSchema);