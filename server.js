'use strict';

const   express = require("express"),
        app = express(),
        PORT = process.env.PORT || 8080;

//Serve static files from public folder.
app.use('/public', express.static(process.cwd() + '/app/public'));

//Pass the HTTPServer to the routes/API endpoints.
require("./app/routes/routes.js")(app);

app.listen(PORT, ()=>console.log(`Investfluence running on Port ${PORT}`));
