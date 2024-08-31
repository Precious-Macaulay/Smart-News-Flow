const { users } = require('../services/websocketService');
const { loadLocalStorage, saveLocalStorage } = require('../helpers/storage');

// Sync data function
exports.dataSync = (req, res) => {
  const { user_id, prompt, ...rest } = req.body;
  console.log('Data received from client:', req.body);

  const localStorageData = loadLocalStorage();
  const userBacklog = localStorageData[user_id] || {};

  if (users[user_id] && users[user_id][prompt]) {
    // User is connected, send the new data
    users[user_id][prompt].send(JSON.stringify(req.body));
    res.status(200).send('Data sent to user');
  } else {
    console.log('User not found or prompt not found, saving data for later.');

    // Store the new data in local storage
    if (!userBacklog[prompt]) {
      userBacklog[prompt] = [];
    }
    userBacklog[prompt].push(req.body);
    localStorageData[user_id] = userBacklog;
    saveLocalStorage(localStorageData);

    res.status(404).send('User or prompt not found');
  }
};
