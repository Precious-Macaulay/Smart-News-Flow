const { users } = require('../services/websocketService');

exports.dataSync = (req, res) => {
  console.log("Data Sync Request");
  const { user_id, tweet } = req.body;
  console.log('body:', req.body);

  console.log('Data Sync:', user_id, tweet);

  if (users[user_id]) {
    users[user_id].send(JSON.stringify(tweet));
    res.status(200).send('Data sent to user');
  } else {
    res.status(404).send('User not found');
  }
};
