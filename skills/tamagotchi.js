
const emoji = require('node-emoji')
const matchAll = require('match-all')
const request = require('request')

// Create an instance of our pet
const Tamagotchi= require('../lib/Tamagotchi')
const pet = new Tamagotchi()
const POOP = ':shit:'

var catchErrors = (fn) => {
  return function(bot, message) {
    return fn(bot, message).catch(err => bot.reply(message, 'Uh oh! Something went wrong'));
  };
};


module.exports = (controller) => {
	let standby = 0

	controller.on('facebook_lose_thread_control', (bot, message) => {
		console.log(`There goes user ${message.user}`)
	})
	controller.on('facebook_receive_thread_control', (bot, message) => {
		console.log(`Just got thread control for ${message.user}!`)
	})

	controller.on('standby', (bot, message) => {
		standby++
		if (standby > 3) {
			request.post({
				url: 'https://graph.facebook.com/v2.6/me/take_thread_control',
				qs: {access_token: controller.config.access_token},
				json: true,
				body: {
					recipient: {id: message.user},
					metadata: 'Mine'
				},
			}, (err, res, body) => {
			if (err) { 
				console.log(`Bummer: ${err}`)
			} else {
				if (body.error) {
					console.log(`Awww danng, API error: ${body.error}`)
				}
				console.log({body})
			}
			})
			standby = 0
		}
	})

	controller.hears('operator', 'message_received', (bot, message) => {
		// console.log({message})
		// controller.api.handover.pass_thread_control(message.user, controller.config.secondary_app, null, (err, success) => {
		// 	if (err) {
		// 		console.log('Error', err)
		// 	} else {
		// 		console.log('Success', {success})
		// 	}
		// })

		request.post({
			url: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
			qs: {access_token: controller.config.access_token},
			json: true,
			body: {
				recipient: {id: message.user},
				target_app_id: controller.config.secondary_app,
				metadata: "Tag, you are it"
			}
		}, (err, res, body) => {
			if (err) { 
				console.log(`Bummer: ${err}`)
			} else {
				if (body.error) {
					console.log(`Awww danng, API error: ${body.error}`)
				}
				console.log({body})
			}
		})
	})

	controller.hears(['^feed$', ...emoji.food ], 'message_received, facebook_postback, quick_reply', catchErrors(async (bot, message) => {
		// this is only grabbing the first occurence of the first emoji in our list above
		const food = message.match[0]
		const msg = pet.feed.pizza(food)

		// bot.reply(message, {attachment: {
		// 	type: 'image',
		// 	payload: {
		// 		url: controller.images.nom
		// 	}
		// }})
		bot.reply(message, pet.print())
		bot.reply(message, msg)
		console.log(pet.print())
	}))

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
