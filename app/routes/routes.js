'use strict';

const p = process.cwd() + "/app/public";

module.exports = (app)=>{

  app.get('/', (req, res)=>res.sendFile(p + "/index.html"));

}
