
module.exports = (controller) => {

	let standby = 0

	// controller.api.handover.get_secondary_receivers_list((err, res) => {
	// 	if (err) {
	// 		console.log('Bummer!',err)
	// 	} else {
	// 		console.log('Receiver list:', res)
	// 	}
	// })
	//
	
	controller.on('facebook_app_roles', (bot, message) => {
		console.log('APP ROLES EVENT:',message.app_roles)
	})

	controller.on('facebook_lose_thread_control', (bot, message) => {
		console.log(`There goes user ${message.user}`)
	})
	controller.on('facebook_receive_thread_control', (bot, message) => {
		console.log(`Just got thread control for ${message.user}!`)
	})
	controller.on('live', (bot, message) => {
		bot.reply(message, 'Handing you off to humans now...')
		request.post({
			url: 'https://graph.facebook.com/v2.6/me/pass_thread_control',
			qs: {access_token: controller.config.access_token},
			json: true,
			body: {
				recipient: {id: message.user},
				target_app_id: 263902037430900,
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

	controller.on('operator', (bot, message) => {
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
}
