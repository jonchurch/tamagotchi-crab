
const emoji = require('node-emoji')
const POOP = ':shit:'

module.exports = (controller) => {

	controller.hears(['^feed$', ...emoji.food ], 'message_received, facebook_postback, quick_reply', (bot, message) => {

		controller.trigger('feed', [bot, message])
	})

	controller.hears(['^play$', ...emoji.activity ], 'message_received, facebook_postback, quick_reply', (bot, message) => {

		controller.trigger('play', [bot, message])
	})

	controller.hears(['poo', 'clean', POOP, ':toilet:'], 'message_received, facebook_postback, quick_reply', (bot, message) => {

		controller.trigger('clean', [bot, message])
	})


	controller.hears('^live$', 'message_received',(bot, message) => {
		controller.trigger('live', [bot, message])
	})

	controller.hears('^operator$', 'message_received', (bot, message) => {
		controller.trigger('operator', [bot, message])
	})

	// Catchall

	controller.hears('(.*)', 'message_received, facebook_postback, quick_reply', (bot, message) => {

		controller.trigger('catchall', [bot, message])
	})

}
