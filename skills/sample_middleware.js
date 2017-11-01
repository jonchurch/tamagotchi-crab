
const emoji = require('node-emoji')

module.exports = function(controller) {

	controller.middleware.normalize.use((bot, message, next) => {
		message.text = emoji.unemojify(message.text)	
		console.log('======DEMOJIFY!', message.text)

		next()
	})

    // controller.middleware.receive.use(function(bot, message, next) {
    //
    //     // do something...
    //     console.log('RCVD:', message);
    //     next();
    //
    // });
    //
    //
    // controller.middleware.send.use(function(bot, message, next) {
    //
    //     // do something...
    //     console.log('SEND:', message);
    //     next();
    //
    // });

}
