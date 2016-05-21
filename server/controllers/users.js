var mongoose = require('mongoose');
//instantiate customer model
var User = mongoose.model('User');
var errors = []
sessionUser = {loggedIn: false};

module.exports = {
	index: function(req, res){
		User.find({}, function(err, Users){
			// res.json([{name:'Tyler'}, {name:'Joe'}]);
			res.json(Users);
		});
	},
	create: function(req,res){
		console.log('create req.body', req.body)
		var user = new User({name: req.body.name})
		user.save(function(err){
			console.log('err in create', err)
			if(err){
				errors = []
				console.log('something went wrong')
				for (var x in err.errors){
					errors.push(err.errors[x].message)
				}
				// console.log('errors in create', errors)
				res.json({status: false, errors: errors})
			} else {
				//create sessionUser and return back to factory
				sessionUser = {
					loggedIn : true,
					name : user.name,
					_id : user._id
				}
				console.log('successfully added name')
				res.json({status: true, sessionUser: sessionUser})
			}
		});
	}
}
