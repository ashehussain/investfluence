'use strict';

const mongoose = require("mongoose");

module.exports = (req, res)=>{
	let campaignId = req.query.id;
	let funds = req.query.funds.toUpperCase().split(",");
	mongoose.connection.db.collections("Campaigns", (err, collCampaign)=>{
		collCampaign.find({"_id": campaignId}).toArray((err2, camp)=>{
			mongoose.connection.db.collections("Funds", (err3, collFunds)=>{
				collFunds.aggregate( [ { $unwind: "$assets.assetAllocation" }, { $match: { $and: [{ "assets.assetAllocation.ticker": { $in: ["GSK"] }}, { "ticker": { $in: ["BUFBX"] } } ] } }, {$group: {"_id": "$ticker", "assets": {$addToSet: "$assets.assetAllocation"}}} ]).exec((err4, results)=>{
					res.json(results);
				})
			});
		})
	});
}
