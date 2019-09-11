'use strict';

// Imports dependencies and set up http server
const  express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());
var accesstoken = "EAAFbH3hsSk4BADtHOrJsxiZAhL2FbwYKJExMmhEKsTkJKbQKe9swweBE81NY0RMyZBVRKSGpSlOiJz1d12ZCTyk2lZB839oxaeRiF9CqZBilodFP2jmW3sEdNUtBGX8kY2rZBydY5Uopp2uQejqX0bcOBuxsZC9KNgxWyZB9iedYOhv3vvN5SaDVbvLZBTMphzhsZD";

app.get('/', (req, res) =>{
  console.log("within /");
  res.send("Hello World");
})

app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "1552000556948"
      
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
      
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
    
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);      
      }
    }
  });
  // Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {  
 
    let body = req.body;
  
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
  
      // Iterates over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Gets the message. entry.messaging is an array, but 
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
        //var senderID = webhook_event.message.;        
        
      });
  
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  
  });

  // Sets server port and logs message on success
  app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));