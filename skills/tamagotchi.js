
const emoji = require('node-emoji')
const matchAll = require('match-all')

// Create an instance of our pet
const Tamagotchi= require('../lib/Tamagotchi')
const pet = new Tamagotchi()
const POOP = ':shit:'

module.exports = (controller) => {
	controller.hears(['^feed$', ...emoji.food ], 'message_received, facebook_postback, quick_reply', (bot, message) => {
		// this is only grabbing the first occurence of the first emoji in our list above
		const food = message.match[0]
		const msg = pet.feed(food)

		// bot.reply(message, {attachment: {
		// 	type: 'image',
		// 	payload: {
		// 		url: controller.images.nom
		// 	}
		// }})
		bot.reply(message, pet.print())
		bot.reply(message, msg)
		console.log(pet.print())
	})

	controller.hears(['^play$', ...emoji.activity ], 'message_received, facebook_postback, quick_reply', (bot, message) => {
		const msg = pet.play()
		console.log(pet.print())
		bot.reply(message, {
			text: emoji.get('balloon'),
		})
		bot.reply(message, pet.print())
		bot.reply(message, msg)

	})

	controller.hears(['poo', 'clean', POOP, ':toilet:'], 'message_received, facebook_postback, quick_reply', (bot, message) => {
		bot.reply(message,emoji.emojify(':sparkles::thumbsup:'))
		pet.poo > 0 ? pet.clean_poo() : pet.increase_poo(2)

	})

	controller.hears('(.*)', 'message_received, facebook_postback, quick_reply', (bot, message) => {
		const msg = pet.idle(message.text)
		console.log(pet.print())
		// bot.reply(message, {attachment: {
		// 	type: 'image',
		// 	payload: {
		// 		url: controller.images.pet
		// 	}
		// }})
		bot.reply(message, msg)
		bot.reply(message, pet.print())
		pet.happy >= 90 ? bot.reply(message, emoji.get(':heart:')) : null

	})

}
