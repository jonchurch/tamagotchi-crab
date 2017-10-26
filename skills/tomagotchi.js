
// Create an instance of our pet
const Tomagotchi= require('../lib/Tomagotchi')
const pet = new Tomagotchi()

module.exports = (controller) => {

	controller.hears('^feed$', 'message_received, facebook_postback, quick_reply', (bot, message) => {
		pet.feed()
		bot.reply(message, 'Fed Pet')
		bot.reply(message, pet.print())
	})

	controller.hears('^play$', 'message_received, facebook_postback, quick_reply', (bot, message) => {
		pet.play()
		bot.reply(message, 'Played with Pet')
		bot.reply(message, pet.print())

	})

	controller.hears('(.*)', 'message_received, facebook_postback, quick_reply', (bot, message) => {
		bot.reply(message, '42')

	})

}
