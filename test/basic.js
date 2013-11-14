"use strict";

var assert = require('chai').assert;
var config = require('./config.js');
var Neorm = require('../lib/neorm.js');

describe('Connect', function ()
{
	it('should ping the neo4j server', function (done)
	{
		var n = new Neorm(config.server);
		n.ping(done);
	});
});