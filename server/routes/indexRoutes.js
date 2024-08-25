const express = require('express');
const router = express.Router();
const { streamData } = require('../controllers/streamController');
const { dataSync } = require('../controllers/dataSyncController');
const { search } = require('../controllers/searchController');
const { checkRelevance } = require('../controllers/langchainController')

router.get('/', (_req, res) => {
  console.log("Server started");
  res.send('Hello, World!');
});

router.post('/search', search);

router.post('/data-sync', dataSync);

router.get('/stream', streamData);

router.post('/refine', async (req, res) => {
  const { prompt, content } = req.body;
  try {
    const relevance = await checkRelevance(prompt, content);
    res.json(relevance);
  } catch (error) {
    console.error('Error checking relevance:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
