# RemindMeChatbot
Build Facebook Messenger chatbot by using Wit.ai. The server is hosted in EC2 cloud computing machine. The operation system is CentOS.

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

2. once the installation is done, run a command `screen` to create a session for ngrok in Linux machine. Then navigates to where I installed ngrok and run `./ngrok http 3000` to open server in port 3000. Use `Ctrl+a D` to detach from the screen.

### Create Facebook App


### Backend

I picked SQLite as my chatbot backend to keep my TODO list. The reason is because SQLite is one of the most basic database to work with and my data load will be very tiny. 

1. `wget https://www.sqlite.org/2019/sqlite-autoconf-3270100.tar.gz` in command line to download SQLite
2. unzip file and install

```
$tar xvfz sqlite-autoconf-3270100.tar.gz
$cd ssqlite-autoconf-3270100
$./configure --prefix=/usr/local
$make
$make install
```

3. create database `sqlite3 chatbotdude.db`. I named my database as 'chatbotdude'
4. create table by run `sqlite3 chatbotdude` in command line then use this query to create table

```
CREATE TABLE TODO(
   id INTEGER PRIMARY KEY     AUTOINCREMENT,
   user           TEXT    NOT NULL,
   class          TEXT     NOT NULL,
   item           TEXT,
   due            TEXT
);
```
