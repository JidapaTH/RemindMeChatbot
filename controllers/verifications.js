module.exports = (req, res) => {
    const hubChallenge = req.query['hub.challenge'];
   const hubMode = req.query['hub.mode'];
    const verifyTokenMatches = (req.query['hub.verify_token'] === 'MomentForestBabaYaka2019');
   if (hubMode && verifyTokenMatches) {
    res.status(200).send(hubChallenge);
    } else {
    res.status(403).end();
    }
   };


// cannot use
//    https://medium.com/crowdbotics/how-to-create-your-very-own-facebook-messenger-bot-with-dialogflow-and-node-js-in-just-one-day-f5f2f5792be5