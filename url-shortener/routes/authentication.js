const express = require('express');
const router = express.Router();
const { googleSignIn } = require('../controllers/userController');

// Route for Google Sign-In
router.post('/auth/google', googleSignIn);

module.exports = router;
