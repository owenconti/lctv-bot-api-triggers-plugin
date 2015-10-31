# lctv-bot-vote-api-triggers
API Triggers plugin for the LCTV Bot

## Setup
Create a `settings.js` file in the plugin's folder. Use the following structure:

```
module.exports = {
	"triggers": [{
		regex: /ohseemedia/,
		status: 'moderator',
		url: 'http://owenconti.com/api-triggers/trigger-test.php',
		method: 'GET',
		params: '?testare=fake'
	}, {
		regex: /tester/,
		status: 'moderator',
		url: 'http://owenconti.com/api-triggers/trigger-test.php',
		method: 'GET',
		params: function( chat, stanza ) {
			return '?user=' + stanza.user.username + '&room=tester'
		}
	}]
};
```

You can add as many triggers as you want in the `triggers` array.

## Usage
Once your triggers are setup, any message in the chat matching the trigger's regex, will make a request to the trigger's url with the params attached.
