/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req,res) {
		var jwt = require('jsonwebtoken');
		var token=jwt.verify(req.cookies['token'],'sh');
		console.log({usid:token.id, token: token.rand});
		Admin.findOne({_id:require('mongodb').ObjectID(token["id"]), rand: token['rand']}, function(err, data) {
			if(err){
				return res.json(500,{message:"Something is wrong"})
			}
			if(!data){
				return res.json({msg:"Not autherised. Try login again"})
			}

			Problems.find({}).exec(function(err, records){
				if(err){
					console.log(err);
					return res.json(500,{err:"Something Went Wrong."});
				}	
				return res.json(200,records);
			})

		})

  		
	},

	delete : function(req,res) {
		var jwt = require('jsonwebtoken');
		var token=jwt.verify(req.cookies['token'],'sh');
		console.log({usid:token.id, token: token.rand});
		Admin.findOne({_id:require('mongodb').ObjectID(token["id"]), rand: token['rand']}, function(err, data) {
			if(err){
				return res.json(500,{message:"Something is wrong"})
			}
			if(!data){
				return res.json({msg:"Not autherised. Try login again"})
			}

			Problems.destroy({_id:require('mongodb').ObjectID(req.param('id'))}).exec(function (err,record) {
				if(err){
					console.log(err);
					return res.json(500,{err:"Something Went Wrong."});
				}
				return res.json(200,{msg:"Sucess"})
			})
		})  		
	},

	login : function(req,res) {
		Admin.findOne({usid:req.param('usid')}, function(err, data) {
			if(err){
				return res.json(500,{message:"Something is wrong"})
			}
			if(!data){
				return res.json({msg:"Invalid Username"})
			}

			var bcrypt=require('bcrypt-nodejs');
			//bcrypt.compare(req.param('pass'),data.pass,function(err,rest){
				if(req.param('pass')==data.pass){
					var randomstring = require("randomstring")
					rand=randomstring.generate(7)
					data.rand=rand;
					data.save();
					console.log(data)
					var jwt = require('jsonwebtoken');
					token=jwt.sign({ id: data.id, rand: rand },'sh');
					res.cookie('token',token);
					return res.json(200,{msg:"Sucess"});
				}
				else{
					return res.json(200,{err:"Invalid Password."});
				}
			///});
		})
	},

	logout: function (req, res) {
		var jwt = require('jsonwebtoken');
		var token=jwt.verify(req.cookies['token'],'sh');
		Admin.findOne({_id:require('mongodb').ObjectID(token["id"])}, function(err, record) {
			if(err){
				return res.json(500,{message:"Something is wrong"});
			}
			var randomstring = require("randomstring");
			record.rand=randomstring.generate(7);
			record.save();
			return res.json(200,{message:"Sucess"});
		})
		//return res.json(200,{message:"Invalid Token"});
	}
};

