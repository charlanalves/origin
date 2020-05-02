/**
 * Created by omid on 2/20/17.
 */

//load configurations
let config = require('../__config.js');

//import main modules
let express = require('express');
let app = express();

// using body-parser to get data from POST requests
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



//import routes
let router = require('./routes/index.js');
app.use(config.router_prefix,router);

//starting server
//if statements Makes sure that our tests don’t listen “twice” to the same port
if(!module.parent){
    app.listen(config.webPort);
    console.log('Starting app on port: '+ config.webPort);
}

//available to tests also
module.exports = app;
