/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	index: function(req,res) {
		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");
  		Problem.find({where: { public: true }}).exec(function(err, records){
			if(err){
				console.log(err);
				return res.json(500,{err:"Something Went Wrong."});
			}	
			return res.json(200,{msg:"Success"});
		}
	},

	create: function(req,res) {
		res.header("Access-Control-Allow-Origin", "*");
  		res.header("Access-Control-Allow-Headers", "X-Requested-With");
  		data=req.param('data');	
  		Problem.create(data,function(err,user){
			if(err){
				console.log(err);
				return res.json(500,{err:"Something Went Wrong."});
			}	
			return res.json(200,{msg:"Success"});
		});
	}
};

