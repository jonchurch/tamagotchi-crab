
class Pet {
	
	constructor () {
		this.hunger = 0
		this.bored = 0

	}

	play () {
		this.bored--
		Math.random() < 0.5 ? this.increase_hunger(3) : this.increase_hunger() 
	}

	feed (food) {
		this.reduce_hunger()
		Math.random() < 0.5 ? this.increase_bored(2) : null
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
