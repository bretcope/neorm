"use strict";
/* -------------------------------------------------------------------
 * Require Statements << Keep in alphabetical order >>
 * ---------------------------------------------------------------- */

var Http = require('http');
var Https = require('https');
var Url = require('url');
 
/* =============================================================================
 * 
 * Class_OR_Section_Name
 *  
 * ========================================================================== */

module.exports = Neorm;
function Neorm (root)
{
	if (root)
		this.root = Url.parse(root.replace(/\/$/, ''));
}

/* -------------------------------------------------------------------
 * Private Members Declaration << no methods >>
 * ---------------------------------------------------------------- */

// code

/* -------------------------------------------------------------------
 * Public Members Declaration << no methods >>
 * ---------------------------------------------------------------- */

Neorm.prototype.root = Url.parse("http://localhost:7474/db/data");

/* -------------------------------------------------------------------
 * Public Methods << Keep in alphabetical order >>
 * ---------------------------------------------------------------- */

/**
 * Tests whether the neo4j server can be reached.
 * @param callback {function} The first argument to callback will be an Error if the ping failed, otherwise null.
 */
Neorm.prototype.ping = function (callback)
{
	this.request('get', '/', null, callback);
};

/**
 * Makes a request directly to the Neo4j REST API.
 * @param method {string} The HTTP method (i.e. GET, POST, PUT)
 * @param path {string} The url path relative to the REST root. For example, '/' == '/db/data/', '/node/123' ==  '/db/data/node/123', etc.
 * @param data {object} A JSON object which will be stringified.
 * @param callback {Function} Argument list (error, obj, status) where `obj` is the JSON parsed body of the response, and status is the HTTP status code of the response. If there was an error, the HTTP response code, if any, can be obtained through `error.code`.
 */
Neorm.prototype.request = function (method, path, data, callback)
{
	var options =
	{
		hostname: this.root.hostname,
		port: this.root.port,
		path: this.root.path + path,
		auth: this.root.auth,
		method: method,
		headers: { Accept: 'application/json', 'X-Stream': 'true' }
	};

	if (data !== undefined && data !== null)
		options.headers['Content-Type'] = 'application/json';
	
	var http = this.root.protocol === 'https:' ? Https : Http;
	
	var request = http.request(options, function (response)
	{
		var result = [];
		var error = null;
		if (response.statusCode > 204)
		{
			error = new Error('Unspecified neo4j API Error.');
			error.code = response.statusCode;
		}
		
		response.setEncoding('utf8');
		response.on('data', function (data) { result.push(data); });
		
		response.on('end', function ()
		{
			var obj = null;

			try
			{
				if (result.length)
					obj = JSON.parse(result.join(''));
			}
			catch (e)
			{
				callback(e);
				return;
			}

			if (error)
			{
				if (obj)
				{
					error.innerError = obj;
					error.message = obj.message;
					error.exception = obj.exception;
					error.fullname = obj.fullname;
				}
				callback(error);
			}
			else
			{
				callback(null, obj, response.statusCode);
			}
		});
	});
	
	request.on('error', callback);

	if (data !== undefined && data !== null)
		request.write(JSON.stringify(data));

	request.end();
};

/* -------------------------------------------------------------------
 * Private Methods << Keep in alphabetical order >>
 * ---------------------------------------------------------------- */

//

/* -------------------------------------------------------------------
 * Initialization
 * ---------------------------------------------------------------- */

// If function calls need to be made to initialize the module, put those calls here.
