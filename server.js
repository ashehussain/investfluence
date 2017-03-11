'use strict';

const   express = require("express"),
        app = express(),
        PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>console.log(`Investfluence running on Port ${PORT}`));