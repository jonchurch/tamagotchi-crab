var Tamagotchi = require('../lib/tamagotchi.js')
var util = require('util')
var config = require('../lib/config.js')

module.exports = function(controller) {
  var tamagotchi, 
        pet = config.actions.pet,
        food = config.actions.food
  
  controller.on('message_received', function(bot, message) {
    
    console.log('===pet', pet)
    
    var action = message.text;
    var status;
    
    bot.startConversation(message, function(err, convo) {
      

    // check whether our pet has already been created
    if (tamagotchi == undefined) {
      // if our tamagotchi still hasn't been created we will create one
      tamagotchi = new Tamagotchi(sillyname., pet, food);
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
          case ("debug"):
            status = tamagotchi.getState()
          default:
            status = "Your tamagotchi needs your help to grow up strong";
        }
      }
    }
    var aiSimulation = tamagotchi.aiSimulate(bot, message);
    
    // indicate happiness and poop status
      convo.say({"attachment":{
      "type":"image",
      "payload":{
        "url":"http://i.imgur.com/1yyWa4X.gif"
      }
    }})
    convo.say(tamagotchi.getStatus())
    console.log(status);
    var replyMessage = {
      text: status,
      quick_replies: [
        {
          content_type: 'text',
          title: 'Feed',
          payload: ''
        },
        {
          content_type: 'text',
          title: 'Play',
          payload: ''
        },
        {
          content_type: 'text',
          title: tamagotchi.awake ? 'Sleep' : 'Wake',
          payload: ''
        },
        
      ]
    }
    convo.say(replyMessage);
    
    })
  })
  
}