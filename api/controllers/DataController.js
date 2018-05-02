/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	pidata: function(req,res) {
		record={}
		Problems.find({}, function(err,response){
	        if(err) return res.json(error);
	        response.forEach(function (data) {
	        	//console.log(data.time);
	        	time=(Math.floor((data.time-345600000)/604800000)*604800000).toString();//same value for same week
	        	//console.log(time);
	        	if(!record[time]){
	        		record[time]=1;
	        	}
	        	else record[time]+=1;
	        	console.log(record);
	        });
	        return res.json(record)
	    });
	}

	
};

