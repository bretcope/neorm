"use strict";
/* -------------------------------------------------------------------
 * Require Statements << Keep in alphabetical order >>
 * ---------------------------------------------------------------- */

var coRequest = require('co-request');
var Transaction = require('./Transaction');

/* =============================================================================
 * 
 * Graph Class
 *  
 * ========================================================================== */

module.exports = Graph;

function Graph (url, idProvider)
{
	if (!(this instanceof Graph))
		return new Graph(url, idProvider);
	
	/* -------------------------------------------------------------------
	 * Private Members Declaration << no methods >>
	 * ---------------------------------------------------------------- */

	let _graph = this;
	let _url;

	/* -------------------------------------------------------------------
	 * Public Members Declaration << no methods >>
	 * ---------------------------------------------------------------- */

	Object.defineProperties(_graph,
	{
		url:
		{
			get: function () { return _url; },
			set: function (url)
			{
				//trim trailing slash
				_url = String(url).replace(/\/$/, '');
			}
		}
	});

	/* -------------------------------------------------------------------
	 * Public Methods << Keep in alphabetical order >>
	 * ---------------------------------------------------------------- */

	_graph.ping = function * ()
	{
		let response = yield _graph.request('get', '/');
		return response.statusCode === 200;
	};
	
	_graph.query = function * (query, params, options)
	{
		let statement = { statement: query };
		if (params)
			statement.parameters = params;
		
		let req = { statements:[ statement ] };
		return yield _graph.requestResults('post', '/transaction/commit', req);
	};
	
	_graph.request = function * (method, path, data)
	{
		let options =
		{
			method: method,
			url: _url + path,
			headers: { Accept: 'application/json', 'X-Stream': 'true' }
		};

		if (data !== undefined && data !== null)
			options.json = data;
		
		let response = yield coRequest(options);
		
		if (typeof response.body === 'string' && response.headers['content-type'].indexOf('application/json') !== -1)
			response.body = JSON.parse(response.body);
		
		return response;
	};
	
	_graph.requestResults = function * (method, path, data)
	{
		let response = yield _graph.request(method, path, data);
		if (response.statusCode > 201 || !response.body || (!response.body.results && !response.body.errors))
		{
			let error = new Error();
			if (response.statusCode > 201)
				error.message = 'Neo4j returned status code ' + response.statusCode;
			else
				error.message = 'Neo4j did not return a results body.';
			
			error.code = response.statusCode;
			error.method = method;
			error.path = path;
			error.data = data;
			error.body = response.body;
			
			throw error;
		}
		
		if (response.body.errors instanceof Array && response.body.errors.length > 0)
		{
			let error = new Error();
			let first = response.body.errors[0];
			for (let i in first)
				error[i] = first[i];
			
			error.originalErrors = response.body.errors;
			
			throw error;
		}
		
		return response.body.results;
	};

	/* -------------------------------------------------------------------
	 * Private Methods << Keep in alphabetical order >>
	 * ---------------------------------------------------------------- */

	// code

	/* -------------------------------------------------------------------
	 * Initialization
	 * ---------------------------------------------------------------- */

	_graph.url = url;
}
