
// Create an instance of our pet
const Tomagotchi= require('../lib/Tomagotchi')
const pet = new Tomagotchi()

module.exports = (controller) => {

	controller.hears('^feed$', 'message_received, facebook_postback, quick_reply', (bot, message) => {
		pet.feed()
		bot.reply(message, 'Fed Pet')
		bot.reply(message, {
			text: pet.print(),
			quick_replies: pet.quick_menu()
		})
	})

	controller.hears('^play$', 'message_received, facebook_postback, quick_reply', (bot, message) => {
		pet.play()
		bot.reply(message, pet.print())
		bot.reply(message, {
			text: 'Played with Pet',
			quick_replies: pet.quick_menu()
		})

	})

	controller.hears('(.*)', 'message_received, facebook_postback, quick_reply', (bot, message) => {
		bot.reply(message, {
			text: pet.idle(), 
			quick_replies: pet.quick_menu()
		})
	})

}
