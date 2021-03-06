// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 5000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let message;
let counter = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  counter++;
  wss.broadcast ({type: 'counter', count: counter})


wss.broadcast(message);

ws.on('message', handleMessage);
wss.broadcast(message);

// Set up a callback for when a client closes the socket. This usually means they closed their browser.
ws.on('close', () => {
  counter--;
  wss.broadcast ({type: 'counter', count: counter})

  })
})


wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(JSON.stringify(data));
  });
};


function handleMessage(message) {
  console.log(JSON.parse(message).username);
  message = JSON.parse(message);
  message.id = uuid.v4();
  console.log(message.id);
  wss.broadcast(message);
}
