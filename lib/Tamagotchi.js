
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
		this.food = 20
		this.happy = 80
		this.fav_food = [':ramen:', ':pizza:']
		this.hates_food = ['apple']

		this.words = ['I love you', 'Hi']

	}
	status () {
		return {food: this.food, happy: this.happy}
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
		return `food: ${this.food} | Happy: ${this.happy}}`
	}

	play (game) {
		this.increase_happy()
		chance(0.5) ? this.reduce_food(10) : this.reduce_food(5) 
	}

	teach (word) {
		this.words.push(word)
	}

	feed (food) {
		let msg
		if (this.food < 50) {
			if (this.fav_food.includes(food)) {
				console.log(`fav food fed ${food}`)
				this.increase_food(10)
				msg = `Mmmm I love ${emoji.get(food)}!`
			} else if (this.hates_food.includes(food)) {
				msg = `Bleh I hate ${emoji.get(food)}!`
				console.log(`hated food fed ${food}`)
				this.reduce_happy()
			} else {
				this.increase_food(5)
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
		if (this.food < 35) {
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
