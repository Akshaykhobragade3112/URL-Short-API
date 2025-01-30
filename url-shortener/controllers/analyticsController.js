const Url = require('../models/url');

exports.getUrlAnalytics = async (req, res) => {
    try {
        const { alias } = req.params;
        const url = await Url.findOne({ shortUrl: alias });

        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        // Mocked data; replace with actual analytics data retrieval logic
        const analytics = {
            totalClicks: 150,  // Example data
            uniqueUsers: 120,
            clicksByDate: [{ date: '2023-01-01', count: 20 }],
            osType: [{ osName: 'Windows', uniqueClicks: 70, uniqueUsers: 60 }],
            deviceType: [{ deviceName: 'Desktop', uniqueClicks: 100, uniqueUsers: 90 }]
        };

        res.status(200).json({ analytics });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
