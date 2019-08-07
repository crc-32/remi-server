'use strict';

const express = require('express');

const GoogleAssistant = require('./assistant-sdk-nodejs/google-assistant-grpc/googleassistant');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(express.static('static'))
app.get('/assist', (req, res) => {
  if (req.query['query'] !== undefined && req.query['query'].trim() !== "" && req.query['clientid'] !== undefined && req.query['clientid'].trim() !== undefined
  && req.query['clientsecret'] !== undefined && req.query['clientsecret'].trim() !== undefined && req.query['clientrefresh'] !== undefined && req.query['clientrefresh'].trim() !== undefined)
  {
    const CREDENTIALS = {
      client_id: req.query['clientid'],
      client_secret: req.query['clientsecret'],
      refresh_token: req.query['clientrefresh'],
      type: "authorized_user"
    };
    
    const assistant = new GoogleAssistant(CREDENTIALS);
    assistant.assist(req.query['query']).then(({text, deviceAction}) => {
      if (deviceAction !== undefined)
      {
        console.log(deviceAction);
        res.send('I\'m sorry Dave, I\'m afraid I can\'t do that\n(Device actions not yet supported)');
        res.end();
        return;
      }
      res.send(text);
      res.end();
    }, ({err}) => {
      console.log(err);
      res.send('An error occured\n' + err);
      res.end();
    });
  }else{
    res.sendStatus(400);
    res.end();
  }
});

app.listen(PORT, HOST, function () {
  console.log("Listening");
});