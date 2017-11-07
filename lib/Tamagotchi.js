
const emoji = require('node-emoji')
const sentiment = require('sentiment')
const moment = require('moment')

const chance = (amount) => {
	return Math.random() < amount
}

const rand = arr => {
	return arr[Math.floor(Math.random()*arr.length)]
}

class Pet {
	
	constructor () {
		this.hunger = 0
		this.happy = 50
		this.fav_food = [':ramen:', ':pizza:']
		this.hates_food = [':apple:']

		this.poo = 0
		this.last_poo = moment().format()

		this.words = ['I love you', 'Hi']

		this.last_active = moment().format()

	}
	status () {
		return {hunger: this.hunger, happy: this.happy, poo: this.poo}
	}

	increase_hunger(int) {
		const amt = int || 10
		this.hunger + amt >= 50 ? this.hunger = 50 : this.hunger += amt
		console.log(`Increasing hunger: ${this.hunger}`)
		return this.hunger
	}
	increase_happy (int) {
		const amt = int || 10
		console.log({int})
		this.happy + amt >= 100 ? this.happy = 100 : this.happy += amt
		console.log(`Increasing happy: ${this.happy}`)
		return this.happy
	}
	increase_poo (int) {
		const amt = int || 1
		this.poo + amt >= 5 ? this.poo = 5 : this.poo += amt
		console.log(`Increasing poo by ${amt}`)
		this.last_poo = moment().format()
		return this.poo
	}
	reduce_hunger(int) {
		const amt = int || 10
		this.hunger - amt <= 0 ? this.hunger = 0 : this.hunger -= amt
		chance(.5) ? this.increase_poo() : null
		console.log(`Reducing hunger: ${this.hunger}`)
		return this.hunger
	}
	reduce_happy(int) {
		const amt = int || 10
		this.happy - amt <= 0 ? this.happy = 0 : this.happy -= amt
		console.log(`Reducing happy: ${this.happy}`)
		return this.happy
	}
	reduce_poo (int) {
		const amt = int || 1
		this.poo - amt <= 0 ? this.poo = 0 : this.poo -= amt
		console.log(`Reducing poo by ${amt}`)
		return this.poo
	}

	print () {
		return `Hunger: ${this.hunger} | Happy: ${this.happy} | Poo ${this.poo}`
	}

	clean_poo () {
		this.tick()
		this.reduce_poo()
		return this.status()
	}

	play (game) {
		this.tick()
		this.increase_happy(10)
		chance(0.5) ? this.increase_hunger(10) : this.increase_hunger(20) 
		this.last_active = moment().format()
		return this.status()
	}

	teach (word) {
		this.words.push(word)
	}

	feed (food) {
		this.tick()
		let msg
		if (this.hunger > 0) {
			if (this.fav_food.includes(food)) {
				console.log(`fav hunger fed ${food}`)
				this.reduce_hunger(20)
				msg = `Mmmm I love ${emoji.get(food)}!`
			} else if (this.hates_food.includes(food)) {
				msg = `Bleh I hate ${emoji.get(food)}!`
				console.log(`hated hunger fed ${food}`)
				this.reduce_happy()
			} else {
				this.reduce_hunger(10)
				console.log(`No food fed ${food}`)
				msg = `Thanks for feeding me, it was okay ${emoji.get('grin')}`
			}
		} else {
			this.reduce_happy()
			msg = `I'm not hungry`
		}
		this.last_active = moment().format()

		return this.status()
	}
	tick () {
		const d = moment().diff(this.last_active, 'seconds')
		console.log({d})
		if (d > 1) {
			chance(.5) ? this.reduce_happy((d / 60) * 10) : null
			chance(.5) ? this.increase_hunger() : null

			if (this.happy < 1) {
				//kill pet
				return false
			} else {
				return true
			}
		}


	}

	idle (message) {
		const alive = this.tick()
		if (! alive) {
			return 'Your pet has died!'
		}
		let msg = []
		let mood = this.listen(message)
		msg.push(mood)
		if (this.happy < 60) {
			msg.push("I'm not happy!")
		} else {
			msg.push(`${rand(this.words)}`) 
		}
		if (this.hunger > 35) {
				msg.push(`${msg} \nI'm hungry feed me!`)
			}
		if (this.poo > 0) {
			chance((this.poo * 20)/100) ? this.reduce_happy(10) : null
		}
		// if (this.last_poo ) {}

		// Random chances of effects
		chance(.25) ? this.reduce_happy() : null

		this.last_active = moment().format()
		return rand(msg)//this.status()
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
		this.last_active = moment().format()
		return msg

	}

}

module.exports = Pet
