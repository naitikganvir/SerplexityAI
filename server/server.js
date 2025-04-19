require('dotenv').config();
const express = require('express');
const cors = require('cors');
const searchRoutes = require('./routes/searchRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use the search routes
app.use('/api/search', searchRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
