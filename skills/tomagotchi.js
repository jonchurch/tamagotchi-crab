
const emoji = require('node-emoji')

// Create an instance of our pet
const Tomagotchi= require('../lib/Tomagotchi')
const pet = new Tomagotchi()

module.exports = (controller) => {

	controller.hears(['^feed$', ...emoji.food ], 'message_received, facebook_postback, quick_reply', async (bot, message) => {
		const food = emoji.which(message.text)

		await bot.reply(message, pet.feed(food))
		console.log(pet.print())
	})

	controller.hears('^play$', 'message_received, facebook_postback, quick_reply', async (bot, message) => {
		pet.play()
		console.log(pet.print())
		await bot.reply(message, {
			text: 'Played with Pet',
		})

	})

	controller.hears('(.*)', 'message_received, facebook_postback, quick_reply', (bot, message) => {

		console.log(pet.print())
		bot.reply(message, pet.idle(message.text))
	})

}
