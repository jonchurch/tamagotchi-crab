
module.exports = (controller) => {
	// Create place for image uploads
	controller.images = {
		pet: 'https://media.giphy.com/media/KaGQJvlsMqupa/giphy.gif',
		nom: 'https://m.popkey.co/52621a/Wpkmg_s-200x150.gif'
	}

	// controller.api.attachment_upload.upload({
	// 		type: 'image',
	// 		payload: {
	// 			url: 'https://media.giphy.com/media/KaGQJvlsMqupa/giphy.gif',
	// 			is_reusable: true
	// 		}
	// 	}, (err, attachmentId) => {
			
	// 		controller.images.pet = attachmentId
// })
	// controller.api.attachment_upload.upload({
	// 		type: 'image',
	// 		payload: {
	// 			url: 'https://m.popkey.co/52621a/Wpkmg_s-200x150.gif',
	// 			is_reusable: true
	// 		}
	// 	}, (err, attachmentId) => {
	// 		controller.images.nom = attachmentId
// })
}
