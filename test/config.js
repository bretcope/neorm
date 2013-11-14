"use strict";

var fs = require('fs');

if (fs.existsSync('./config.json'))
{
	//use config file if provided
	module.exports = JSON.parse(fs.readFileSync('./config.json', { encoding:'utf8' }));
}
else
{
	//default config values
	module.exports = 
	{
		server: 'http://localhost:7474/db/data'
	};
}