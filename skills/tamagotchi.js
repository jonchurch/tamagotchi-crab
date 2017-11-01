
const emoji = require('node-emoji')
const matchAll = require('match-all')

// Create an instance of our pet
const Tamagotchi= require('../lib/Tamagotchi')
const pet = new Tamagotchi()

module.exports = (controller) => {
	controller.hears(['^feed$', ...emoji.food ], 'message_received, facebook_postback, quick_reply', (bot, message) => {
		// Check user input for all food emoji
		// seperate out food emoji into an array
		// const food = emoji.which(message.text)
		

		const foodReg = new RegExp(`/${emoji.food.reduce((a,b) => `${a}|${b}`, 'food')}/g`)
		// const converted = emoji.unemojify(message.text)
		// console.log('Converted:\n',JSON.stringify(converted))
		// const matches = message.text.match(foodReg)
		// console.log({matches})

		// const food = converted.match(foodReg)
		// console.log(emoji.food)
		// bot.reply(message, message.text)
		// console.log(message.text)

		// console.log('MESSAGE AS IS',JSON.stringify(message))
		// console.log({foodReg})
		// console.log('Food:\n', food)

		pet.feed()

		bot.reply(message, {attachment: {
			type: 'image',
			payload: {
				attachment_id: controller.images['nom']
			}
		}})
		console.log(pet.print())
	})

	controller.hears(['^play$', ...emoji.activity ], 'message_received, facebook_postback, quick_reply', async (bot, message) => {
		pet.play()
		console.log(pet.print())
		await bot.reply(message, {
			text: 'Played with Pet',
		})

	})

	controller.hears('(.*)', 'message_received, facebook_postback, quick_reply', (bot, message) => {
		pet.idle(message.text)
		console.log(pet.print())
		bot.reply(message, {attachment: {
			type: 'image',
			payload: {
				attachment_id: controller.images.pet
			}
		}})
		// bot.reply(message, )
	})

}
