
const emoji = require('node-emoji')
const matchAll = require('match-all')

// Create an instance of our pet
const Tamagotchi= require('../lib/Tamagotchi')
const pet = new Tamagotchi()

module.exports = (controller) => {
	controller.hears(['^feed$', ...emoji.food ], 'message_received, facebook_postback, quick_reply', (bot, message) => {
		// this is only grabbing the first occurence of the first emoji in our list above
		const food = message.match[0]
		pet.feed(food)

		bot.reply(message, {attachment: {
			type: 'image',
			payload: {
				url: controller.images.nom
			}
		}})
		bot.reply(message, pet.print())
		console.log(pet.print())
	})

	controller.hears(['^play$', ...emoji.activity ], 'message_received, facebook_postback, quick_reply', (bot, message) => {
		pet.play()
		console.log(pet.print())
		bot.reply(message, {
			text: emoji.get('balloon'),
		})
		bot.reply(message, pet.print())

	})

	controller.hears('(.*)', 'message_received, facebook_postback, quick_reply', (bot, message) => {
		pet.idle(message.text)
		console.log(pet.print())
		bot.reply(message, {attachment: {
			type: 'image',
			payload: {
				url: controller.images.pet
			}
		}})
		bot.reply(message, pet.print())
	})

}
