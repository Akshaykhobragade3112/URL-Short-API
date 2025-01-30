const Url = require('../models/url');
const User = require('../models/user');

exports.createShortUrl = async (req, res) => {
    try {
        const { longUrl, customAlias, topic, userId } = req.body;
        const existingUrl = customAlias ? await Url.findOne({ shortUrl: customAlias }) : null;

        if (existingUrl) {
            return res.status(409).json({ message: "Custom alias already in use." });
        }

        const url = new Url({
            longUrl,
            shortUrl: customAlias || undefined,
            createdBy: userId,
            topic
        });

        await url.save();
        res.status(201).json(url);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.redirectShortUrl = async (req, res) => {
    try {
        const { alias } = req.params;
        const url = await Url.findOne({ shortUrl: alias });

        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        res.redirect(url.longUrl);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
