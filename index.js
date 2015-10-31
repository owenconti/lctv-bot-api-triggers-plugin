'use strict';

const request = require('request');

const runtime = require('../../utils/Runtime');
const Log = require('../../utils/Log');

// NOTE: This settings file is a '.js' file!
const pluginSettings = require('./settings.js');

module.exports = [{
	types: ['message'],
	regex: /.+/,
	ignoreRateLimiting: true,
	action: function( chat, stanza ) {
		// Don't send requests for bot messages
		if ( stanza.user.isBot() ) {
			return;
		}

		let triggers = pluginSettings.triggers;
		triggers.forEach( ( triggerObj ) => {
			let regexMatch = triggerObj.regex.test( stanza.message );
			let statusMatch = stanza.user.hasStatus( triggerObj.status );

			if ( regexMatch && statusMatch ) {
				runTrigger( triggerObj, chat, stanza );
			}
		} );
	}
}];

function runTrigger( triggerObj, chat, stanza ) {
	Log.log(`[api-triggers] Running trigger ${triggerObj.regex}`);

	let params = '';
	if ( triggerObj.params ) {
		if ( typeof triggerObj.params === 'function' ) {
			params = triggerObj.params( chat, stanza );
		} else {
			params = triggerObj.params;
		}
	}
	let options = {
		method: triggerObj.method,
		url: triggerObj.url + params,
	};
	request( options, ( err, response, body ) => {
		let msg = 'Trigger request successful';

		if ( err ) {
			msg = 'Error calling trigger request';
		}
		Log.log(`[api-triggers] ${msg}`);
	} );
}
