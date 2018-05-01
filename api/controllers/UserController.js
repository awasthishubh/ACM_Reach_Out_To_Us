/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	index: function(req,res) {
		var randomstring = require("randomstring")

		// if(!req.cookies['client']){
			client=randomstring.generate(16);
			res.cookie('client',client);
		// } else {
		// 	client=req.cookies['client'];
		// }
		
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

	test: function(req,res) {
		//res.
		// console.log(req.cookies);
		// res.cookie('cooks',"hbzzhb");
		// res.send("sdz");
		// verify a token symmetric - synchronous
		// var jwt = require('jsonwebtoken');
		// var token = jwt.sign({ foo: 'bar' });
		// console.log(token);
		// var decoded = jwt.verify(token);
		// console.log(decoded) // bar
		// FLOOR((C2-345600000)/604800000,1)*604800000
		
		var jwt = require('jsonwebtoken');
		var token=jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZTg4ZjZkYzFjODEyNzE0OGI1ODNiOCIsInJhbmQiOiI5M2QzSlBFIiwiaWF0IjoxNTI1MTkwNTU0fQ.RTg_j1uYP-0RnhAcu_AuajpDGC7vbPr6GVo0vrKApVs",'sh');
		mongo=require('sails-mongo');
		var id = require('mongodb').ObjectID(token["id"]);
		console.log({_id:id, rand: token['rand']});
		console.log(token);
		
	}
};

