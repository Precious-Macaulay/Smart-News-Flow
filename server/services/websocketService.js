const WebSocket = require('ws');
const { loadLocalStorage } = require('../helpers/storage');

const users = {};

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const userId = urlParams.get('userId');
    const prompt = urlParams.get('prompt');

    if (!users[userId]) {
      users[userId] = {};
    }
    users[userId][prompt] = ws;

    console.log(`User ${userId} connected with prompt ${prompt}`);

    // Load and send backlog data for the specific prompt
    const localStorageData = loadLocalStorage();
    const promptBacklog = localStorageData[userId] ? localStorageData[userId][prompt] || [] : [];

    promptBacklog.forEach(data => ws.send(JSON.stringify(data)));

    ws.on('message', (message) => {
      console.log(`Received message from user ${userId} with prompt ${prompt}: ${message}`);
    });

    ws.on('close', () => {
      if (users[userId]) {
        delete users[userId][prompt];
        if (Object.keys(users[userId]).length === 0) {
          delete users[userId];
        }
      }
    });
  });

  wss.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  return wss;
};

module.exports.users = users;
