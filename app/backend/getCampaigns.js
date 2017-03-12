'use strict';

const mongoose = require("mongoose");

module.exports = (req, res)=>{
    let arr2 = {};
    let arr = req.query.ticker.split(",");
    let gotFundsObj = new Promise((resolve, reject)=>{
        mongoose.connection.db.collection("Funds", (err, coll)=>{
            if(err) reject(err);
            coll.find({"ticker": {$in: arr}}).toArray((err2, doc)=>{
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
                                console.log(`Pushing arr2: ${JSON.stringify(doc)}`);
                                doc.forEach((camp)=>{
                                    if(arr2.hasOwnProperty(camp._id)){
                                        arr2[camp._id].fundsAssociatedWith.push(fund.ticker);
                                    } else {
                                        camp.fundsAssociatedWith = [fund.ticker];
                                        arr2[camp._id] = camp;
                                    }
                                })
                                console.log(`Arr2: ${JSON.stringify(arr2)}`)
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
        console.log(arr2);
        let arr3 = [];
        for(let i in arr2){
            arr3.push(arr2[i]);
        }
        res.send(arr3);
    }, (err)=>console.log(err));
    });

}
