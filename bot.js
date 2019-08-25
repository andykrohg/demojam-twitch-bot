var exec = require('child_process').exec;
const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  },
  channels: [
    process.env.USERNAME
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const directive = msg.trim().toLowerCase();

  console.log(context.username);
  // If the command is known, let's execute it
  if (['up', 'down', 'left', 'right'].indexOf(directive) >= 0) {
      console.log("executing arrow-" + directive);
    exec('./cliclick kd:arrow-' + directive+ ' w:250 ku:arrow-' + directive)
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
