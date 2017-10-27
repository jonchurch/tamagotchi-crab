
const chance = (amount) => {
	return Math.random() < amount
}

const rand = arr => {
	return arr[Math.floor(Math.random()*arr.length)]
}

class Pet {
	
	constructor () {
		this.hunger = 1
		this.bored = 0
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
		chance(0.5) ? this.increase_hunger(2) : this.increase_hunger() 
	}

	teach (word) {
		this.words.push(word)
	}

	feed (food) {
		let msg
		if (this.hunger > 0) {
			if (this.fav_food.includes(food)) {
				this.reduce_hunger(2)
				msg = `Mmmm I love ${food}!`
			} else if (this.hates_food.includes(food)) {
				msg = `Bleh I hate ${food}!`
				this.increase_hunger()
			} else {
				this.reduce_hunger()
				msg = 'Thanks for feeding me, it was okay'
			}
		} else {
			msg = `I'm not hungry`
		}

		chance(0.5) ? this.increase_bored(1) : null
		return msg
	}

	idle () {
		let msg
		if (this.hunger + this.bored >= 5) {
			msg = "I'm not happy!"
		} else {
				// msg = "I seek higher stages of Maslow's Hierarchy!"
			msg = rand(this.words)
				
		}
		if (this.hunger > 4) {
				msg = `${msg} \nI'm hungry feed me!`
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
