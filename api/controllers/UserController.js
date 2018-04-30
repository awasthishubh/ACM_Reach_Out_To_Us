/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	index: function(req,res) {
  		Problem.find({where: { public: true }}, function(err, records){
			if(err){
				console.log(err);
				return res.json(500,{err:"Something Went Wrong."});
			}	
			return res.json(200,records);
		}
	},

	create: function(req,res) {
  		data=req.param('data');	
  		Problem.create(data,function(err,user){
			if(err){
				console.log(err);
				return res.json(500,{err:"Something Went Wrong."});
			}	
			return res.json(200,{msg:"Success"});
		});
	},

	cookie: function(req,res) {
		res.cookie('cook',true);
		res.send("sd");
	}
};

