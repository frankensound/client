const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 4000;

// Serve static files from the Vue app
app.use(express.static(path.join(__dirname, 'dist')));

// Endpoint to serve runtime configuration
app.get('/config/config.json', (req, res) => {
    const runtimeConfig = {
        VITE_AUTH0_DOMAIN: process.env.VITE_AUTH0_DOMAIN,
        VITE_AUTH0_CLIENT_ID: process.env.VITE_AUTH0_CLIENT_ID,
        VITE_AUTH0_AUDIENCE: process.env.VITE_AUTH0_AUDIENCE,
        VITE_BASE_URL: process.env.VITE_BASE_URL,
        VITE_GATEWAY_URL: process.env.VITE_GATEWAY_URL
    };
    res.json(runtimeConfig);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});