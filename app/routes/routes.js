'use strict';

const p = process.cwd() + "/app/public",
      getContact = require("../backend/getContact.js");

module.exports = (app)=>{

  app.get('/', (req, res)=>res.sendFile(p + "/index.html"));
  app.get('/contact/:ticker', getContact);

}
