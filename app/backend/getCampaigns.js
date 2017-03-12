'use strict';

module.exports = (req, res)=>{
  console.log(req.query.ticker);
  let dummy =  [{
	"name": "T. Rowe Price International Gr & Inc",
	"assets": {
		"assetAllocation": [{
			"ticker": "GSK",
			"name": "GlaxoSmithKline",
			"shares": 5566772,
			"percentage_of_all_shares": 0.23,
			"change_num_shares": 904000,
			"change_percentage": 19.39,
			"percent_total_assets": 1.82,
			"mfund_ticker": "TRIGX"
		}]
	}
}, {
	"name": "Fidelity® Series Growth & Income",
	"assets": {
		"assetAllocation": [{
			"ticker": "GSK",
			"name": "GlaxoSmithKline",
			"shares": 3163300,
			"percentage_of_all_shares": 0.13,
			"change_num_shares": 2100,
			"change_percentage": 0.07,
			"percent_total_assets": 1.37,
			"mfund_ticker": "FGLGX"
		}]
	}
}];

  res.send(JSON.stringify(dummy));
}
