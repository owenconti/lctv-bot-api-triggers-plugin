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
