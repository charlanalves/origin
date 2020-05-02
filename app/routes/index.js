/**
 * Created by Charlan Santos
 */

//define routers

//import what we need
let express = require('express');
let router = express.Router();

const { calRisk } = require('../controllers/calRisk');

router.get('/',function(request, response, next){
    response.send('hello world');
});
router.post('/risk', calRisk);

//make the router accessible for the application
module.exports = router;
