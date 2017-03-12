'use strict';

//Accepts an express query with a ticker symbol, queries the DB for the parsed contact information.

module.exports = (req, res)=>{
  console.log(req.params.ticker);
}
