'use strict';

const mongoose = require("mongodb");

module.exports = (req, res)=>{
	console.log("Hello detailed");
	mongoose.MongoClient.connect(process.env.MONGO, (err, db)=>{
		let funds = req.query.funds.toUpperCase().split(",");
		db.collection("Campaigns").findOne({_id: mongoose.ObjectID(req.query.id)}, (err2, camp)=>{
			if(err2) console.log(err2);
			console.log(camp);
			db.collection("Funds").aggregate( [ { $unwind: "$assets.assetAllocation" }, { $match: { $and: [{ "assets.assetAllocation.ticker": { $in: camp.targetedStocks }}, { "ticker": { $in: funds } } ] } }, {$group: {"_id": "$ticker", "assets": {$addToSet: "$assets.assetAllocation"}}} ], (err4, results)=>{
				if(err4) console.log(err4);
				//console.log(camp);
				camp.funds = results;
				//console.log(camp);
				res.json(camp);
			});
		});
	});
/*
	console.log(mongoose.connections);
	console.log("getting camp details.");
	let campaignId = req.query.id;
	let funds = req.query.funds.toUpperCase().split(",");
	console.log(`${campaignId} + ${funds}\n`);
	mongoose.db.collection("Campaigns").find({"_id": campaignId}).toArray((err2, camp)=>{
			console.log(camp);
			console.log("camp\n");
			if(err2) console.log(err2);
				mongoose.d
b.collection("Funds").aggregate( [ { $unwind: "$assets.assetAllocation" }]).exec((err4, results)=>{
					console.log("aggregate");
					if(err4) console.log(err4);
					res.json(results);
				})
			
			});
		})
	});
*/
}
