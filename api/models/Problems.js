/**
 * Problems.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		// name: {
		// 	type:"string"
		// },
		// age: {
		// 	type:"integer"
		// },
		gender: {
			type:"string"
		},
		email: {
			type:"string"
		},
		category: {
			type:"string"
		},
		description: {
			type:"string"
		},
		type: {
			type:"string"
		},
		location: {
			type:"json",
			defaultsTo:[]
		},
		// public:{
		// 	type:"boolean"
		// },
		up: {
			type: "array",
			defaultsTo:[]
		},
		down: {
			type: "array",
			defaultsTo:[]
		},
		additional: {
			type: "string",
			defaultsTo:''
		}

	}
};
