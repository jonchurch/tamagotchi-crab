
var config = {};


// This should be your own mobile telephone number
// You will use it to control your Tamagotchi
config.myNumber = process.env.MY_NUMBER;

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
// A good practice is to store these string values as system environment variables, and load them from there as we are doing below. 
// Alternately, you could hard code these values here as strings.
config.twilioConfig = {
    // You can get your AccountSid and AuthToken from https://www.twilio.com/user/account/voice
    // Make sure you expand the Show API Credentials
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    // A Twilio number you control - choose one from:
    // https://www.twilio.com/user/account/phone-numbers/incoming
    number: process.env.TWILIO_NUMBER
  }
  // configure foods and games to be played
config.actions = {
    pet: ["hangman", "tic-tac-toe", "human knot", "london bridges", "frog races", "water balloon fights", "silly relay races"],
    food: ["apple", "cheetos", "burrito", "lettuce", "pear", "ice cream"]
  }
  // Export configuration object
module.exports = config;