# RemindMeChatbot
Build Facebook Messenger chatbot by using Wit.ai

### prerequisite
1. Install Node.js https://nodejs.org/en/
2. Have a facebook account
3. Have a facebook page

### prepare webhook

A webhook server is necessary as it is used as a portal to Wit.ai and Facebook messenger. It works like a real-time API. Receive message from messenger and then post back to it. To create a webhook server, I use Express, Node.js api framework.

1. create new project `npm init`
2. install important library
`npm install express body-parser request node-wit node-fetch crypto --save`
3. create "index.js". This file will be the main page to connect with other things 
4. to run the server. run `node index.js`

### Create Facebook App
