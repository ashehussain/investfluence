'use strict';

const p = process.cwd() + "/app/public",
	  getCampaigns = require("../backend/getCampaigns.js"),
	  getCampaignDetails = require("../backend/getCampaignDetails.js"),
      getContact = require("../backend/getContact.js");


module.exports = (app)=>{

  app.get('/', (req, res)=>res.sendFile(p + "/index.html"));
  app.get('/search', (req, res)=>res.sendFile(p + "/search/index.html"));
  app.get('/campaigndetails', (req, res)=>res.sendFile(p + "/campaigndetails/index.html"));
  app.get('/contact/:ticker', getContact);
  app.get('/campaigns', getCampaigns);
  // app.get('/campaigns-details', getCampaignDetails);
}
