
const chance = (amount) => {
	return Math.random() < amount
}

class Pet {
	
	constructor () {
		this.hunger = 0
		this.bored = 0

	}

	increase_bored(int) {
		const amt = int || 1
		this.bored + amt <= 5 ? this.bored = 5 : this.bored += amt
		console.log(`Increasing bored: ${this.bored}`)
		return this.bored
	}
	increase_hunger(int) {
		const amt = int || 1
		this.hunger + amt >= 5 ? this.hunger = 5 : this.hunger += amt
		console.log(`Increasing hunger: ${this.hunger}`)
		return this.hunger
	}
	reduce_bored(int) {
		const amt = int || 1
		this.bored - amt <= 0 ? this.bored = 0 : this.bored -= amt
		console.log(`Reducing bored: ${this.bored}`)
		return this.bored
		
	}
	reduce_hunger(int) {
		const amt = int || 1
		this.hunger - amt <= 0 ? this.hunger = 0 : this.hunger -= amt
		console.log(`Reducing hunger: ${this.hunger}`)
		return this.hunger
	}

	print () {
		return `Hunger: ${this.hunger} | Bored: ${this.bored}`
	}

	play (game) {
		this.reduce_bored()
		Math.random() < 0.5 ? this.increase_hunger(2) : this.increase_hunger() 
	}

	feed (food) {
		this.reduce_hunger()
		Math.random() < 0.5 ? this.increase_bored(2) : null
	}

	idle () {
		let msg
		if (this.hunger + this.bored >= 5) {
			msg = "I'm not happy!"
		} else {
				msg = "I seek higher stages of Maslow's Hierarchy!"
		}
		if (this.hunger > 4) {
				msg = `${msg} \nI'm starving feed me!`
			}
		if (this.bored > 4) {
				msg = `${msg} \nI'm bored play with me!`
			}

		// Random chances of effects

		chance(.75) ? this.increase_bored() : null
		chance(.2) ? this.increase_hunger() : null

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
