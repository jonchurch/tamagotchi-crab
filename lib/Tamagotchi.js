
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
		this.hunger = 0
		this.happy = 80
		this.fav_food = [':ramen:', ':pizza:']
		this.hates_food = [':apple:']

		this.words = ['I love you', 'Hi']

	}
	status () {
		return {hunger: this.hunger, happy: this.happy}
	}

	increase_hunger(int) {
		const amt = int || 1
		this.hunger + amt >= 50 ? this.hunger = 50 : this.hunger += amt
		console.log(`Increasing hunger: ${this.hunger}`)
		return this.hunger
	}
	increase_happy (int) {
		const amt = int || 5
		this.happy + amt >= 100 ? this.happy = 100 : this.happy += amt
		console.log(`Increasing happy: ${this.happy}`)
		return this.happy
	}
	reduce_hunger(int) {
		const amt = int || 1
		this.hunger - amt <= 0 ? this.hunger = 0 : this.hunger -= amt
		console.log(`Reducing hunger: ${this.hunger}`)
		return this.hunger
	}
	reduce_happy(int) {
		const amt = int || 5
		this.happy - amt <= 0 ? this.happy = 0 : this.happy -= amt
		console.log(`Reducing happy: ${this.happy}`)
		return this.happy
	}

	print () {
		return `hunger: ${this.hunger} | Happy: ${this.happy}`
	}

	play (game) {
		this.increase_happy()
		chance(0.5) ? this.increase_hunger(10) : this.increase_hunger(5) 
	}

	teach (word) {
		this.words.push(word)
	}

	feed (food) {
		let msg
		if (this.hunger > 0) {
			if (this.fav_food.includes(food)) {
				console.log(`fav hunger fed ${food}`)
				this.reduce_hunger(10)
				msg = `Mmmm I love ${emoji.get(food)}!`
			} else if (this.hates_food.includes(food)) {
				msg = `Bleh I hate ${emoji.get(food)}!`
				console.log(`hated hunger fed ${food}`)
				this.reduce_happy()
			} else {
				this.reduce_hunger(5)
				console.log(`No food fed ${food}`)
				msg = `Thanks for feeding me, it was okay ${emoji.get('grin')}`
			}
		} else {
			this.reduce_happy()
			msg = `I'm not hungry`
		}

		return this.status()
	}

	idle (message) {
		let mood = this.listen(message)
		let msg
		if (this.happy < 60) {
			msg = "I'm not happy!"
		} else {
			msg = `${rand(this.words)}`
		}
		if (this.hunger < 35) {
				msg = `${msg} \nI'm hungry feed me!`
			}
		// Random chances of effects

		chance(.25) ? this.reduce_happy() : null

		return this.status()
	}

	listen (message) {
		let msg 
		const vibe = sentiment(message)
		console.log({vibe})
		if (vibe.score >= 1) {
			this.increase_happy()
			msg = 'Teehee, thanks'
		} else if (vibe.score <= -1 ) {
			this.reduce_happy(10)
			msg = 'Ouch, that hurts'
		}
		return vibe.score 

	}

}

module.exports = Pet
