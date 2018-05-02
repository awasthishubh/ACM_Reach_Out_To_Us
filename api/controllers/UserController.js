/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	index: function(req,res) {
		var randomstring = require("randomstring")
		if(!req.cookies['client']){
			client=randomstring.generate(16);
			res.cookie('client',client,{ maxAge: 9000000000000});
		} else {
			client=req.cookies['client'];
		}

		console.log(client)
  		Problems.find({where: { public: true }}, function(err, records){
			if(err){
				console.log(err);
				return res.json(500,{err:"Something Went Wrong."});
			}
			if(!records){
				return res.json(500,{err:"Empty."});
			}

			records.forEach(function(record) {
				record.upvote=false;
				record.downvote=false;
				if(record.up.indexOf(client)>-1){
					record.upvote=true;
				}
				if(record.down.indexOf(client)>-1){
					record.downvote=true;
				}
			})				
			return res.json(200,records);
		})
	},

	create: function(req,res) {
		var randomstring = require("randomstring")
		if(!req.cookies['client']){
			client=randomstring.generate(16);
			res.cookie('client',client,{ maxAge: 9000000000000});
		} else {
			client=req.cookies['client'];
		}

  		data=req.param('data');	
  		//data.age=23//parseInt(data.age);
  		//console.log(parseInt(data.age));
  		console.log(data);
  		Problems.create(data,function(err,user){

			if(err){
				console.log(err);
				return res.json(500,{err:"Something Went Wrong."});
			}	
			return res.json(200,{msg:"Success"});
		});
	},

	upvote:function(req,res) {
		var randomstring = require("randomstring")
		if(!req.cookies['client']){
			client=randomstring.generate(16);
			res.cookie('client',client,{ maxAge: 9000000000000});
		} else {
			client=req.cookies['client'];
		}

		id=req.param('id');

		Problems.findOne({id:id}, function(err, record) {
			if(err){
				return res.json(500,{message:"Something is wrong"})
			}
			if(!record){
				return res.json({msg:"Invalid id"})
			}
			console.log(record)
			console.log(record.down)

			if(record.down.indexOf(client)>-1){
					record.down.unshift(client)
					console.log("Ss")
				}
			else{
				record.up.push(client)
				console.log(record.up)
			}
			record.save();
			return res.json({msg:"Success"});
			
		})
	},

	downvote:function(req,res) {
		var randomstring = require("randomstring")
		if(!req.cookies['client']){
			client=randomstring.generate(16);
			res.cookie('client',client,{ maxAge: 9000000000000});
		} else {
			client=req.cookies['client'];
		}

		id=req.param('id');

		Problems.findOne({id:id}, function(err, record) {
			if(err){
				return res.json(500,{message:"Something is wrong"})
			}
			if(!record){
				return res.json({msg:"Invalid id"})
			}
		

			if(record.up.indexOf(client)>-1){
					record.up.shift(client)
				}
			else{
				record.down.push(client)
			}
			record.save();
			return res.json({msg:"Success"});
			
		})
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
		console.log(Date.now())
		
	}
};

