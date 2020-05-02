/**
 * Created by Charlan Santos
 */

// configuration variable/object
var config = {};

process.env.NODE_ENV = 'test';
//process.env.NODE_ENV = 'development';

//web configuration
//config.host_name = process.env.HOST_NAME || 'localhost';
//config.host_ip = process.env.HOST_IP || '127.0.0.1';
config.webPort = process.env.WEB_PORT || 8084;


//router confihurations
config.router_prefix = '/api';

//exporting configuration variable/object
module.exports = config;
