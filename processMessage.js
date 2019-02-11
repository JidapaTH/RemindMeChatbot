const API_AI_TOKEN = 'H4KIPD76AQUTEBUVCJATQBHP4QSEBBTM';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAHTGzpOR0ABANekYEPRuABKjrGBZCv5qdQNE8fKOF5dqyTVXd8BUy9OWwJLwRLwZBWHN9jomK37aYQBqZBcsfMHGwVNd2Lnk4PhDSaITfzavO6TKMp32MYE2oAlrcO3hDssv8NBHPCY7M8WrIaTL6Ra2k5p1kSpSYalifVbKZBO5QFAWTJR';
const request = require('request');
const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v2.6/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'MomentForest_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};