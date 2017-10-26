
class Pet {
	
	constructor () {
		this.hunger = 0
		this.bored = 0

	}

	play () {
		this.bored--
		this.hunger++
	}

	feed () {
		this.hunger--
		(Math.random() < 0.5 ? 0 : 1) ? this.bored++ : null
	}

	print () {
		return `Hunger: ${this.hunger} | Bored: ${this.bored}`
	}
}

module.exports = Pet
