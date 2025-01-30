const express = require('express');
const router = express.Router();
const { createShortUrl, redirectShortUrl } = require('../controllers/urlController');
const authenticate = require('../middleware/authenticate');
const rateLimiter = require('../middleware/rateLimit');

// Create a new short URL
router.post('/shorten', authenticate, rateLimiter, createShortUrl);

// Redirect to the original URL based on the short URL
router.get('/shorten/:alias', rateLimiter, redirectShortUrl);

module.exports = router;
