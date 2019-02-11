const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');
const crypto = require('crypto');

let Wit = null;
let log = null;
try {
    // if running from repo
    Wit = require('../').Wit;
    log = require('../').log;
  } catch (e) {
    Wit = require('node-wit').Wit;
    log = require('node-wit').log;
  }
var config = require('./config/config.json');
// const WIT_TOKEN = process.env.WIT_TOKEN;
const WIT_TOKEN = config.witToken;
// const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
const FB_PAGE_TOKEN = config.FBToken;
const FB_APP_SECRET = config.appSecret;
const VERIFYTOKEN = config.verifyToken;



  const fbMessage = (id, text) => {
    const body = JSON.stringify({
      recipient: { id },
      message: { text },
    });

    const qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
    return fetch('https://graph.facebook.com/me/messages?' + qs, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body,
    })
    .then(rsp => rsp.json())
    .then(json => {
      if (json.error && json.error.message) {
        throw new Error(json.error.message);
      }
      return json;
    });
  };

  const findOrCreateSession = (fbid) => {
    let sessionId;
    // Let's see if we already have a session for the user fbid
    Object.keys(sessions).forEach(k => {
      if (sessions[k].fbid === fbid) {
        // Yep, got it!
        sessionId = k;
      }
    });
    if (!sessionId) {
      // No session found for user fbid, let's create a new one
      sessionId = new Date().toISOString();
      sessions[sessionId] = {fbid: fbid, context: {}};
    }
    return sessionId;
  };

  const wit = new Wit({
    accessToken: WIT_TOKEN,
    logger: new log.Logger(log.INFO)
  });

  app.use(({method, url}, rsp, next) => {
    rsp.on('finish', () => {
      console.log(`${rsp.statusCode} ${method} ${url}`);
    });
    next();
  });
  app.use(bodyParser.json({ verify: verifyRequestSignature }));
  app.post('/webhook', (req, res) => {
    // Parse the Messenger payload
    // See the Webhook reference
    // https://developers.facebook.com/docs/messenger-platform/webhook-reference
    const data = req.body;
  
    if (data.object === 'page') {
      data.entry.forEach(entry => {
        entry.messaging.forEach(event => {
          if (event.message && !event.message.is_echo) {
            // Yay! We got a new message!
            // We retrieve the Facebook user ID of the sender
            const sender = event.sender.id;
  
            // We could retrieve the user's current session, or create one if it doesn't exist
            // This is useful if we want our bot to figure out the conversation history
            // const sessionId = findOrCreateSession(sender);
  
            // We retrieve the message content
            const {text, attachments} = event.message;
            
            
            if (attachments) {
              // We received an attachment
              // Let's reply with an automatic message
              fbMessage(sender, 'Sorry I can only process text messages for now.')
              .catch(console.error);
            } else if (text) {
              // We received a text message
              // Let's run /message on the text to extract some entities
              wit.message(text).then(({entities}) => {
                // You can customize your response to these entities
                console.log('get text',text)
                console.log(entities.datetime[0].value);
                // For now, let's reply with another automatic message
                fbMessage(sender, `We've received your message: ${text}.`);
              })
              .catch((err) => {
                console.error('Oops! Got an error from Wit: ', err.stack || err);
              })
            }
          } else {
            console.log('received event', JSON.stringify(event));
          }
        });
      });
    }
    res.sendStatus(200);
  });
  // Adds support for GET requests to our webhook
  app.get('/webhook', (req, res) => {
  
      // Your verify token. Should be a random string.
      let VERIFY_TOKEN = VERIFYTOKEN;
        
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

    function verifyRequestSignature(req, res, buf) {
        var signature = req.headers["x-hub-signature"];
        console.log(signature);
      
        if (!signature) {
          // For testing, let's log an error. In production, you should throw an
          // error.
          console.error("Couldn't validate the signature.");
        } else {
          var elements = signature.split('=');
          var method = elements[0];
          var signatureHash = elements[1];
      
          var expectedHash = crypto.createHmac('sha1', FB_APP_SECRET)
                              .update(buf)
                              .digest('hex');
      
          if (signatureHash != expectedHash) {
            throw new Error("Couldn't validate the request signature.");
          }
        }
      }

app.listen(3000, () => console.log('Webhook server is listening, port 3000'));

// https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup
// https://developers.facebook.com/docs/messenger-platform/built-in-nlp#enabling_nlp