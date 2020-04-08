const request = require('request');

exports.run = (bot, message, args) => {
        request.get('http://thecatapi.com/api/images/get?format=src&type=png', {
                }, function(error, response, body) {
	                    if(!error && response.statusCode == 200) {
		                     message.channel.send(response.request.uri.href);
	                    } else {
		                     console.log(error);
	}
})
}
