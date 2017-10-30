
const emoji = require('node-emoji')
const sentiment = require('sentiment')

const chance = (amount) => {
	return Math.random() < amount
}

const rand = arr => {
	return arr[Math.floor(Math.random()*arr.length)]
}

class Pet {
	
	constructor () {
		this.food = 1
		this.bored = 0
		this.happy = 40
		this.fav_food = ['ramen', 'pizza']
		this.hates_food = ['apple']

		this.words = ['I love you', 'Hi']

	}

	increase_bored(int) {
		const amt = int || 1
		this.bored + amt >= 5 ? this.bored = 5 : this.bored += amt
		console.log(`Increasing bored: ${this.bored}`)
		return this.bored
	}
	increase_food(int) {
		const amt = int || 1
		this.food + amt >= 50 ? this.food = 50 : this.food += amt
		console.log(`Increasing food: ${this.food}`)
		return this.food
	}
	increase_happy (int) {
		const amt = int || 5
		this.happy + amt >= 100 ? this.happy = 100 : this.happy += amt
		console.log(`Increasing happy: ${this.happy}`)
		return this.happy
	}
	reduce_bored(int) {
		const amt = int || 1
		this.bored - amt <= 0 ? this.bored = 0 : this.bored -= amt
		console.log(`Reducing bored: ${this.bored}`)
		return this.bored
		
	}
	reduce_food(int) {
		const amt = int || 1
		this.food - amt <= 0 ? this.food = 0 : this.food -= amt
		console.log(`Reducing food: ${this.food}`)
		return this.food
	}
	reduce_happy(int) {
		const amt = int || 5
		this.happy - amt <= 0 ? this.happy = 0 : this.happy -= amt
		console.log(`Reducing happy: ${this.happy}`)
		return this.happy
	}

	print () {
		return `food: ${this.food} | Bored: ${this.bored}`
	}

	play (game) {
		this.reduce_bored()
		chance(0.5) ? this.reduce_food(5) : this.reduce_food() 
	}

	teach (word) {
		this.words.push(word)
	}

	feed (food) {
		let msg
		if (this.food > 0) {
			if (this.fav_food.includes(food)) {
				this.increase_food(2)
				msg = `Mmmm I love ${emoji.get(food)}!`
			} else if (this.hates_food.includes(food)) {
				msg = `Bleh I hate ${emoji.get(food)}!`
				this.reduce_happy()
			} else {
				this.reduce_happy()
				msg = `Thanks for feeding me, it was okay ${emoji.get('grin')}`
			}
		} else {
			msg = `I'm not food`
		}

		chance(0.5) ? this.increase_bored(1) : null
		return //msg
	}

	idle (message) {
		let msg = this.listen(message)
		if (this.food + this.bored >= 5) {
			msg = "I'm not happy!"
		} else {
				// msg = "I seek higher stages of Maslow's Hierarchy!"
			msg = msg.length ? msg : `${rand(this.words)}`
				
		}
		if (this.food < 4) {
				msg = `${msg} \nI'm food feed me!`
			}
		if (this.bored > 4) {
				msg = `${msg} \nI'm bored play with me!`
			}

		// Random chances of effects

		chance(.75) ? this.increase_bored() : null
		chance(.2) ? this.increase_food() : null

		return //msg
	}

	listen (message) {
		let msg = ''


		const vibe = sentiment(message)
		console.log({vibe})
		if (vibe.score >= 1) {
			this.increase_happy()
			msg = 'Teehee, thanks'
		} else if (vibe.score <= -1 ) {
			this.reduce_happy()
			msg = 'Ouch, that hurts'
		}
		return msg

	}

	quick_menu () {
		const menu = [
				{
					type: 'text',
					title: 'Feed',
					payload: 'feed'
				},
				{
					type: 'text',
					title: 'Play',
					payload: 'Play'
				}

		]

		return menu
	}


}

module.exports = Pet
