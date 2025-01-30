const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignIn = async (req, res) => {
    try {
        const { tokenId, userEmail } = req.body; // Accept user email input

        if (!tokenId) {
            return res.status(400).json({ message: "No token provided" });
        }

        // Verify Google ID Token
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        console.log("Google Payload:", payload); // Debugging - Check email field

        let { sub: googleId, email } = payload;

        // If Google does not return an email, use the manually entered one
        if (!email) {
            if (!userEmail) {
                return res.status(400).json({ message: "Google account has no email. Please provide one." });
            }
            email = userEmail; // Use user-provided email
        }

        let user = await User.findOne({ googleId });

        if (!user) {
            // Create new user if not exists
            user = new User({ googleId, email });
            await user.save();
        }

        // Generate JWT Token
        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            message: "User authenticated successfully",
            user,
            token: jwtToken,
        });
    } catch (error) {
        res.status(500).json({
            message: "Authentication failed",
            error: error.message,
        });
    }
};
