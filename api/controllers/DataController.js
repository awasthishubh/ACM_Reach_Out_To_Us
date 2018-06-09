/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	pidata: function (req,res) {
		Problems.native(function(err, collection) {
		  if (err) return res.json(err);

		  collection.aggregate([{"$group" : {_id:"$category", count:{$sum:1}}}]).toArray(function (err, results) {
		    if (err) return res.serverError(err);
		    return res.json(200,results);
			});
		});
	},

	problems: function (req,res) {
		Problems.count({},function(err, data) {
			console.log(data);
			return res.json(200,{total:data})
		})
	},

	bardata: function (req,res) {
		Problems.native(function(err, collection) {
		  if (err) return res.json(err);

		  collection.aggregate([
								    { "$project": {
								        "month": { "$month": "$createdAt" }
								    }},
								    { "$group": {
								        "_id": "$month",
								        "total": { "$sum": 1 }
								    }}
								]).toArray(function (err, results) {
		    if (err) return res.serverError(err);
		    return res.json(200,results);
			});
		});
	},

	votes: function(req,res) {
		Problems.find({}, function(err, data) {
			if(err){
				console.log(err);
				return res.json(500,{err:'Server error'});
			}
			var up=0, down=0;
			data.forEach(function(record) {
				up+=record.up.length;
				down+=record.down.length;
			})

			return res.json(200, {upVotes:up, downVotes:down});
		})
	}

	// bardata: function(req,res) {
	// 	record={}
	// 	Problems.find({}, function(err,response){
	//         if(err) return res.json(error);
	//         response.forEach(function (data) {
	//         	//console.log(data.time);
	//         	time=(Math.floor((data.time-345600000)/604800000)*604800000).toString();//same value for same week
	//         	//console.log(time);
	//         	if(!record[time]){
	//         		record[time]=1;
	//         	}
	//         	else record[time]+=1;
	//         	console.log(record);
	//         });
	//         return res.json(record)
	//     });
	// },





};
