
class Pet {
	
	constructor () {
		this.hunger = 0
		this.bored = 0

	}

	play () {
		this.bored--
		Math.random() < 0.5 ? this.increase_hunger(2) : null
	}

	feed (food) {
		reduce_hunger()
		Math.random() < 0.5 ? this.reduce_bored() : null
	}

	print () {
		return `Hunger: ${this.hunger} | Bored: ${this.bored}`
	}

	increase_bored() {
		this.bored++
	}
	increase_hunger(num) {
		this.hunger += (num || 1)
	}
	reduce_bored() {
		this.bored--
		
	}
	reduce_hunger() {
		this.hunger--
	}
}

module.exports = Pet
