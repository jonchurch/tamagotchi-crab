var Tamagotchi = require('../lib/tamagotchi.js')

module.exports = function(controller) {
  
  controller.on('message_received', function(bot, message) {
    
    
    
    var action = message.text;
    var status;

    // check whether our pet has already been created
    if (tamagotchi == undefined) {
      // if our tamagotchi still hasn't been created we will create one
      tamagotchi = new Tamagotchi(action, pet, food);
      status = util.format('Hello, my name is %s and I was just born. Do you wanna play?', action);
    } else {
      // check if our pet is awake, we don't want to wake it up
      if (!tamagotchi.awake && action.toLowerCase() != "wake") {
        status = util.format('%s is asleep now', tamagotchi.name);
      } else {
        // let's check which action the user is going for
        switch (action.toLowerCase()) {
          case ("play"):
            status = tamagotchi.play();
            break;
          case ("feed"):
            status = tamagotchi.feed();
            break;
          case ("wake"):
            status = tamagotchi.wake();
            break;
          case ("sleep"):
            status = tamagotchi.sleep();
            break;
          case ("poo"):
            status = tamagotchi.poop();
            break;
          case ("age"):
            status = tamagotchi.checkAge();
            break;
          case ("hungry"):
            status = tamagotchi.checkHunger();
            break;
          case ("happy"):
            status = tamagotchi.checkHappiness();
            break;
          default:
            status = "Actions: play, feed, sleep, wake, poo\nStatus: age, hungry, happy";
        }
      }
    }
    var aiSimulation = tamagotchi.aiSimulate();
    console.log(status);
    reply(message.twiml(status));
    
  })
  
}