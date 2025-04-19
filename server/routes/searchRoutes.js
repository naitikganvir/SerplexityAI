const express = require('express');
const axios = require('axios');

const router = express.Router();
const serpApiKey = process.env.SERP_API_KEY;

// Handle user queries
router.post('/', async (req, res) => {
    const { query } = req.body;

    try {
        // Fetch search results from SerpAPI
        const serpResponse = await axios.get('https://serpapi.com/search', {
            params: {
                q: query,
                api_key: serpApiKey,
                num: 5, // Limit to top 5 results
            },
        });

        const searchResults = serpResponse.data.organic_results.map(result => ({
            title: result.title,
            link: result.link,
            snippet: result.snippet,
        }));

        res.json({ results: searchResults });
    } catch (error) {
        console.error('Error fetching results:', error.message);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

module.exports = router;
