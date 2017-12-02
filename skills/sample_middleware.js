
const emoji = require('node-emoji')

module.exports = function(controller) {

	// remove unicode emoji and replace with :emoji: codes
	controller.middleware.normalize.use((bot, message, next) => {
		message.text = emoji.unemojify(message.text)	

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
