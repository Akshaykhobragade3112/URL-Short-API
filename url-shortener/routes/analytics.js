const express = require('express');
const router = express.Router();
const { getUrlAnalytics } = require('../controllers/analyticsController');
const authenticate = require('../middleware/authenticate');

// Retrieve analytics for a specific short URL
router.get('/analytics/:alias', authenticate, getUrlAnalytics);

module.exports = router;
