
class Pet {
	
	constructor () {
		this.hunger = 0
		this.bored = 0

	}

	increase_bored() {
		const amt = int || 1
		return this.bored < 5 ? this.bored += amt : this.bored
	}
	increase_hunger(int) {
		const amt = int || 1
		return this.hunger < 4 ? this.hunger += amt : this.hunger 
	}
	reduce_bored(int) {
		const amt = int || 1
		return this.bored > 0 ? this.bored -= amt : this.bored
		
	}
	reduce_hunger(int) {
		const amt = int || 1
		return this.hunger > 0 ? this.hunger -= amt : this.hunger
	}

	print () {
		return `Hunger: ${this.hunger} | Bored: ${this.bored}`
	}

	play (game) {
		this.reduce_bored()
		Math.random() < 0.5 ? this.increase_hunger(3) : this.increase_hunger() 
	}

	feed (food) {
		this.reduce_hunger()
		Math.random() < 0.5 ? this.increase_bored(2) : null
	}

	idle () {
		let msg
		if (this.hunger + this.bored > 5) {
			msg = "I'm not happy!"
		} else {
				msg = "I seek higher stages of Maslow's Hierarchy!"
		}
		if (this.hunger > 4) {
				msg = `${msg} \nI'm starving feed me!`
			}
		if (this.bored > 4) {
				bot.reply(message, "I'm bored!")
				msg = `${msg} \nI'm bored play with me!`
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
