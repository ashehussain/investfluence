'use strict';

if(!parseInt(process.env.PROD)) require("dotenv").load();

const   
		//express framework
		express = require("express"),
		//http server
        app = express(),
        //driver, connects to DB
        mongoose = require("mongoose"),
        PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO);

//Serve static files from public folder.
app.use('/public', express.static(process.cwd() + '/app/public'));

//Pass the HTTPServer to the routes/API endpoints.
require("./app/routes/routes.js")(app);

app.listen(PORT, ()=>console.log(`Investfluence running on Port ${PORT}`));
