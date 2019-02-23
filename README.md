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

### set up for https

1. Facebook requires https. In this case, I have to use ngrok for my server.

*** Check out their link here for the installation --> https://ngrok.com/

2. once the installation is done, run a command `ngrok http 3000` to open server in port 3000.

### Create Facebook App


### Backend

I picked SQLite as my chatbot backend to keep my TODO list. The reason is because SQLite is one of the most basic database to work with and my data load will be very tiny. 
