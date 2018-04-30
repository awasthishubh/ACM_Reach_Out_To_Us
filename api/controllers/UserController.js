/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	index: function(req,res) {
  		Problems.find({where: { public: true }}, function(err, records){
			if(err){
				console.log(err);
				return res.json(500,{err:"Something Went Wrong."});
			}	
			return res.json(200,records);
		})
	},

	create: function(req,res) {
  		data=req.param('data');	
  		Problems.create(data,function(err,user){
			if(err){
				console.log(err);
				return res.json(500,{err:"Something Went Wrong."});
			}	
			return res.json(200,{msg:"Success"});
		});
	},

	cookie: function(req,res) {
		//res.
		// console.log(req.cookies);
		// res.cookie('cooks',"hbzzhb");
		// res.send("sdz");
		// verify a token symmetric - synchronous
		var jwt = require('jsonwebtoken');
		var token = jwt.sign({ foo: 'bar' });
		console.log(token);
		var decoded = jwt.verify(token);
		console.log(decoded) // bar
		
	}
};

