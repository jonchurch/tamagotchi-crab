var Tamagotchi = require('../lib/tamagotchi.js')
var util = require('util')
var config = require('../lib/config.js')
var sillyname = require('sillyname')

module.exports = function(controller) {
  var tamagotchi, 
        pet = config.actions.pet,
        food = config.actions.food
  
  controller.on('message_received', function(bot, message) {
    
    var action = message.text;
    var status;
    var gif
    
    bot.startConversation(message, function(err, convo) {
        

    // check whether our pet has already been created
    if (tamagotchi == undefined) {
      // if our tamagotchi still hasn't been created we will create one
      var randomName = sillyname()
      tamagotchi = new Tamagotchi(randomName, pet, food);
      
      status = util.format('Hello, my name is %s and I was just born. Do you wanna play?', randomName);
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
            console.log('STATE', status)
            break;
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
        "url": tamagotchi.awake ? tamagotchi.gif.IDLE : tamagotchi.gif.ASLEEP
      }
    }})
      console.log('awake:', tamagotchi.awake)
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
        {
          content_type: 'text',
          title: 'Poo',
          payload: ''
        },
        
      ]
    }
    convo.say(replyMessage);
    
    })
  })
  
}