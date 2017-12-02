
const emoji = require('node-emoji')
const matchAll = require('match-all')
const request = require('request')

// Create an instance of our pet
const Tamagotchi= require('../lib/Tamagotchi')
const pet = new Tamagotchi()

var catchErrors = (fn) => {
  return function(bot, message) {
    return fn(bot, message).catch(err => bot.reply(message, 'Uh oh! Something went wrong'));
  };
};


module.exports = (controller) => {

	controller.on('feed', catchErrors(async (bot, message) => {
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
	}))

	controller.on('play', (bot, message) => {
		const msg = pet.play()
		console.log(pet.print())
		bot.reply(message, {
			text: emoji.get('balloon'),
		})
		bot.reply(message, pet.print())
		bot.reply(message, msg)

	})

	controller.on('clean', (bot, message) => {
		bot.reply(message,emoji.emojify(':sparkles::thumbsup:'))
		pet.poo > 0 ? pet.clean_poo() : pet.increase_poo(2)

	})

	controller.on('catchall', (bot, message) => {
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
