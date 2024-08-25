const { users } = require('../services/websocketService');

exports.dataSync = (req, res) => {
  const { user_id, news } = req.body;

  if (users[user_id]) {
    users[user_id].send(JSON.stringify(news));
    res.status(200).send('Data sent to user');
  } else {
    res.status(404).send('User not found');
  }
};
