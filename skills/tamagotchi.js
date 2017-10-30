
const emoji = require('node-emoji')

// Create an instance of our pet
const Tamagotchi= require('../lib/Tamagotchi')
const pet = new Tamagotchi()
var images = []

module.exports = (controller) => {
	controller.api.attachment_upload.upload({
			type: 'image',
			payload: {
				url: 'https://media.giphy.com/media/KaGQJvlsMqupa/giphy.gif',
				is_reusable: true
			}
		}, (err, attachmentId) => {
			images['pet'] = attachmentId
})
	controller.api.attachment_upload.upload({
			type: 'image',
			payload: {
				url: 'https://m.popkey.co/52621a/Wpkmg_s-200x150.gif',
				is_reusable: true
			}
		}, (err, attachmentId) => {
			images['nom'] = attachmentId
})

	controller.hears(['^feed$', ...emoji.food ], 'message_received, facebook_postback, quick_reply', async (bot, message) => {
		const food = emoji.which(message.text)

		pet.feed(food)

		bot.reply(message, {attachment: {
			type: 'image',
			payload: {
				attachment_id: images['nom']
			}
		}})
		console.log(pet.print())
		console.log({images})
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
		console.log(images['pet'])
		bot.reply(message, {attachment: {
			type: 'image',
			payload: {
				attachment_id: images['pet']
			}
		}})
		// bot.reply(message, )
	})

}
