 var util = require('util');
// var message = require('./message');

var Tamagotchi = function(name, pet, food) {
    this.name = name;
    this.pet = pet;
    this.food = food;
    this.hunger = 0;
    this.awake = true;
    this.happy = 3;
    this.poo = 0;
    this.age = 0;
  
    this.gif = {
      IDLE: 'http://i.imgur.com/1yyWa4X.gif',
      ASLEEP: 'https://media.giphy.com/media/Ck8yL3rkoTEk0/source.gif'
    }
}

// ACTIONS
Tamagotchi.prototype.play = function() {
  // A pet usually get's happy and hungry after playing a game
  this.hunger++;
  this.happy++;
  return util.format('%s played a nice game of %s', this.name, this.pet[Math.floor(Math.random() * this.pet.length)]);
};

Tamagotchi.prototype.feed = function() {
  // When you feed it, it gets a little bit less hungry, but will eventually get tired and need to poop
  if (this.hunger > 0) {
    this.hunger--;
    this.poo++;
    this.getSad();
    return util.format("%s just ate some delicious %s", this.name, this.food[Math.floor(Math.random() * this.food.length)]);
  }
  return "Not hungry!";
};

Tamagotchi.prototype.sleep = function() {
  // Sleeping takes a lot of energy
  if (this.awake) {
    this.poo++;
    this.awake = false;
    return util.format("%s just went to sleep", this.name);
  }
  return util.format("%s is already sleeping", this.name);
};
Tamagotchi.prototype.wake = function() {
  if (this.awake) {
    return util.format("%s is already awake", this.name);
  }
  this.awake = true;
  return util.format("%s just woke up", this.name);
};
Tamagotchi.prototype.poop = function() {
  if (this.poo > 0) {
    this.poo--;
    return util.format("%s just had a nice poo", this.name);
  }
  return util.format("%s doesn't need to poo right now", this.name);
};

Tamagotchi.prototype.getSad = function() {
  if (this.happy > 0)
    this.happy--;
};

Tamagotchi.prototype.aging = function() {
  // Everyone gets a little bit sad when they get older.
  this.age++;
  this.getSad();
  return util.format("%s is now one year older", this.name);
};

// STATUS
Tamagotchi.prototype.checkAge = function() {
  return util.format("%s age: %d", this.name, this.age);
};

Tamagotchi.prototype.checkHunger = function() {
  return util.format("%s hunger level: %d", this.name, this.hunger);
};

Tamagotchi.prototype.checkHappiness = function() {
  return util.format("%s happiness level: %d", this.name, this.happy);
};

Tamagotchi.prototype.getStatus = function() {
  var stat, heart, poo
  heart = Array(+this.happy + 1).join('❤')
  poo = Array(+this.poo + 1).join('💩')
  stat = heart + poo
  console.log(Array(+this.poo + 1).join('💩'))
  console.log(this.getState())
  return stat
}

// PERSONALITY

Tamagotchi.prototype.aiSimulate = function(bot, message) {
  if (!this.awake) {
    odds(100, 50) ? this.wake() : bot.reply(message, "ZzzzZzzzZzzz");
  }
  if (odds(10, 8)) {
    if (this.poo == 0) {
      this.poop();
    }
  } else if (odds(10, 2)) {
    this.aging();
  } else if (this.awake && odds(100, 20)) {
    this.sleep();
  }
  if (this.poo > 1 || this.hunger > 1) {
    this.getSad();
  }
  if (this.happy == 1 && odds(10, 7) || this.happy == 0) {
    // This downward spiral is fucking brutal!
    // poop will kill your tamagotchi hotdamn
    // this.poo++;
    // this.hunger++;
    if (this.happy == 0) {
       if (odds(10, 9)) {
         bot.reply(message, this.name + ' has died!')
       }
    }
    
    bot.reply(message, util.format("Please take batter care of %s :-(", this.name))

  }
  if (this.hunger > 5) {
    this.poo++;
    bot.reply(message, util.format("Please give %s some food :-(", this.name));
  }
};

// UTIL


function odds(range, threshold) {
  var random = Math.floor(Math.random() * range) + 1;
  if (random > threshold) {
    return true;
  }
  return false;
};


// DEBUG
Tamagotchi.prototype.getState = function() {
  console.log('GETTTING STATE')
  return JSON.stringify({
    hunger: this.hunger,
    happy: this.happy,
    poo: this.poo,
    age: this.age
  })
}

module.exports = Tamagotchi;