// Zaroori packages ko import karna
const express = require('express');
const { IgApiClient } = require('instagram-private-api');
const path = require('path');
require('dotenv').config(); // .env file se variables load karne ke liye

// Express app banana
const app = express();
const port = process.env.PORT || 3000;

// Instagram client setup
const ig = new IgApiClient();

// JSON aur static files ke liye middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Instagram login function
async function login() {
    const username = process.env.IG_USERNAME;
    const password = process.env.IG_PASSWORD;
    
    if (!username || !password) {
        throw new Error("Instagram credentials (IG_USERNAME, IG_PASSWORD) environment variables me set nahi hain.");
    }

    console.log('Logging in to Instagram...');
    ig.state.generateDevice(username);
    await ig.account.login(username, password);
    console.log('Login successful!');
}

// Main download API endpoint
app.post('/api/download', async (req, res) => {
    const storyUrl = req.body.url;

    if (!storyUrl) {
        return res.status(400).json({ success: false, message: 'URL nahi mila.' });
    }

    try {
        const urlParts = storyUrl.split('/');
        const username = urlParts[4];
        const storyPk = urlParts[5].split('?')[0];

        if (!username || !storyPk) throw new Error('Invalid URL format');

        const user = await ig.user.searchExact(username);
        const reelsFeed = ig.feed.reelsMedia({ userIds: [user.pk] });
        const storyItems = await reelsFeed.items();
        const story = storyItems.find(item => item.pk === storyPk);

        if (!story) {
            return res.status(404).json({ success: false, message: 'Story nahi mili ya expire ho gayi hai.' });
        }

        const isVideo = story.media_type === 2;
        const downloadUrl = isVideo ? story.video_versions[0].url : story.image_versions2.candidates[0].url;
        const thumbnailUrl = story.image_versions2.candidates[0].url;

        res.json({ success: true, downloadUrl, thumbnailUrl, isVideo });

    } catch (error) {
        console.error('Error fetching story:', error);
        res.status(500).json({ success: false, message: 'Story fetch karne me error aaya.' });
    }
});

// Server ko start karna
async function startServer() {
    try {
        await login();
        app.listen(port, () => {
            console.log(`Server http://localhost:${port} par chal raha hai`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
}

startServer();
