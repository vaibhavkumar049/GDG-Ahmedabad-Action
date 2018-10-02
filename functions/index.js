"use strict";
const {
  dialogflow,
  List,
  Suggestions,
  LinkOutSuggestion,
  SimpleResponse
} = require("actions-on-google");
const app = dialogflow({ debug: true });
const functions = require("firebase-functions");

app.intent("New Welcome Intent", conv => {
  conv.ask(
    new SimpleResponse({
      speech: `The GDG Ahmedabad Action welcomes you. How can I help you today?`,
      text: `The GDG Ahmedabad Action welcomes you. How can I help you today?`
    }),
    new Suggestions([`DevFest 2k18`, `About GDG Ahmedabad`, `WTM`])
  );
});

app.intent("AboutGDGIntent", conv => {
  conv.ask(
    // `<speak> <sub alias="Google Developers Group">GDG</sub> <say-as interpret-as="characters">GDG</say-as> Ahmedabad is open and volunteer geek community who create exciting projects and share experience about Google technologies with a passion.</speak>`
    `<speak>Google Developers Group Ahmedabad is open and volunteer geek community who create exciting projects and share experience about Google technologies with a passion.</speak>`
  );
  conv.ask(new Suggestions(`Past Events`));
  conv.ask(
    new LinkOutSuggestion(
      {
        name: `GDG Ahmedabad Website`,
        url: `https://www.gdgahmedabad.com/`
      }
      // ,
      // {
      //   destinationName: "Visit DevFest Website",
      //   url: "http://devfest.gdgahmedabad.com/"
      // }
    )
  );
});

// https://firebase.google.com/docs/functions/write-firebase-functions
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
