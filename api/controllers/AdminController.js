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

		Admin.findOne({id:token['id'], token: token['rand']}, function(err, data) {
			if(error){
				return res.json(500,{message:"Something is wrong"})
			}
			if(!data){
				return res.json({msg:"Not autherised. Try login again"})
			}

			Problem.find({}).exec(function(err, records){
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

		Admin.findOne({id:token['id'], rand: token['rand']}, function(err, data) {
			if(error){
				return res.json(500,{message:"Something is wrong"})
			}
			if(!data){
				return res.json({msg:"Not autherised. Try login again"})
			}

			Problem.delete({id:req.param('id')}).exec(function (err,record) {
				if(err){
					console.log(err);
					return res.json(500,{err:"Something Went Wrong."});
				}
				return res.json(200,{msg:"Sucess"})
			})
		})  		
	},

	login : function function_name(argument) {
		Admin.findOne({usid:req.param('usid')}, function(err, data) {
			if(error){
				return res.json(500,{message:"Something is wrong"})
			}
			if(!data){
				return res.json({msg:"Invalid Username"})
			}

			var bcrypt=require('bcrypt-nodejs');
			bcrypt.compare(req.param('pass'),data.pass,function(err,rest){
				if(rest){
					var randomstring = require("randomstring")
					rand=randomstring.generate(7)
					data.rand=rand;
					data.save();
					var jwt = require('jsonwebtoken');
					token=jwt.sign({ id: 'data.id', rand: rand },'sh');
					res.cookie('token',token);
				}
				else{
					return res.json(200,{err:"Invalid Password."});
				}
			});
		})
	},

	logout: function (req, res) {
		var jwt = require('jsonwebtoken');
		var token=jwt.verify(req.cookies['token'],'sh');
		Admin.findOne({id:token['id']}, function(err, record) {
			if(err){
				return res.json(500,{message:"Something is wrong"});
			}
			var randomstring = require("randomstring");
			record.rand=randomstring.generate(7);
		})
	}
};

