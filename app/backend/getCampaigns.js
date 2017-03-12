'use strict';

const mongoose = require("mongoose");

module.exports = (req, res)=>{
    let obj = {};
    let arr = req.query.ticker.split(","),
	arr2MikeSucks = req.query.ticker.toUpperCase().split(",");
	console.log(arr);
    let gotFundsObj = new Promise((resolve, reject)=>{
        mongoose.connection.db.collection("Funds", (err, coll)=>{
            if(err) reject(err);
            coll.find({$or: [{"ticker": {$in: arr2MikeSucks}}, {"name": {$in: arr}}]}).toArray((err2, doc)=>{
                if(err2) reject(err2);
                resolve(doc);
            });
        });
    });

    let promArr = [];

    gotFundsObj.then((fundsObj)=>{
        console.log("getfundsthen");
        let assetAllocationsArr = fundsObj.forEach((fund)=>{
            fund.assets.assetAllocation.forEach((stock)=>{
                promArr.push(new Promise((resolve, reject)=>{
                        mongoose.connection.db.collection("Campaigns", (err, coll)=>{
                            if(err) throw err;
                            console.log(stock.ticker);
                            coll.find({"targetedStocks": {$elemMatch: {$eq: stock.ticker}}}).toArray((err2, doc)=>{
                                if(err2) reject(err2);
                                console.log(`Pushing obj: ${JSON.stringify(doc)}`);
                                doc.forEach((camp)=>{
                                    if(obj.hasOwnProperty(camp._id)){
                                        obj[camp._id].fundsAssociatedWith.push(fund.ticker);
                                    } else {
                                        camp.fundsAssociatedWith = [fund.ticker];
                                        obj[camp._id] = camp;
                                    }
                                })
                                console.log(`obj: ${JSON.stringify(obj)}`)
                                resolve();
                            });
                        });
                    })
                )
            });
        })

    console.log(promArr);

    Promise.all(promArr).then((results)=>{
        console.log("All promises done");
        console.log(obj);
        let arr3 = [];
        for(let i in obj){
            arr3.push(obj[i]);
        }
        res.send(JSON.stringify(arr3));
    }, (err)=>console.log(err));
    });

}
