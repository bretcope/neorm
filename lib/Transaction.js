"use strict";
/* -------------------------------------------------------------------
 * Require Statements << Keep in alphabetical order >>
 * ---------------------------------------------------------------- */

//

/* =============================================================================
 * 
 * Transaction Class
 *  
 * ========================================================================== */

module.exports = Transaction;

function Transaction (graph)
{
	/* -------------------------------------------------------------------
	 * Private Members Declaration << no methods >>
	 * ---------------------------------------------------------------- */
	
	Object.defineProperties(this, 
	{
		__graph: { value: graph },
		__queryQueue: { value: [] }
	});
	
 	/* -------------------------------------------------------------------
	 * Public Members Declaration << no methods >>
	 * ---------------------------------------------------------------- */
	
	this.expires = null;
	this.open = false;
	
	Object.defineProperties(this,
	{
		isExpired: { get: function () { return !this.expires || this.expires > new Date() } }
	});
}

/* -------------------------------------------------------------------
 * Public Methods << Keep in alphabetical order >>
 * ---------------------------------------------------------------- */

Transaction.prototype.commit = function * ()
{
	//
};

Transaction.prototype.exec = function * ()
{
	//
};

Transaction.prototype.keepAlive = function * ()
{
	//
};

Transaction.prototype.query = function * (query, params)
{
	//
};

Transaction.prototype.rollback = function * ()
{
	//
};

/* -------------------------------------------------------------------
 * Private Methods << Keep in alphabetical order >>
 * ---------------------------------------------------------------- */

// code

/* -------------------------------------------------------------------
 * Initialization
 * ---------------------------------------------------------------- */

// If function calls need to be made to initialize the module, put those calls here.
