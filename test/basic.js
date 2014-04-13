"use strict";

var assert = require('assert');
var config = require('./config.js');
var Graph = require('../lib').Graph;

suite('Basic Functions', function ()
{
	test('Ping the neo4j server', function * ()
	{
		let graph = new Graph(config.server);
		assert(yield graph.ping());
	});
	
	test('Get the root node', function * ()
	{
		let graph = new Graph(config.server);
		let res = yield graph.request('get', '/node/0');
		
		assert(res.statusCode === 200);
		assert(res.body);
		assert(/node\/0$/.test(res.body.self));
	});
	
	test('Get root via Cypher', function * ()
	{
		let graph = new Graph(config.server);
		let res = yield graph.query('START n = node(0) RETURN n;');
	});
});
