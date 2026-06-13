const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public')); // This serves your website files

// This stores HWIDs that are allowed to use the script
// Note: On Render's free plan, this resets when the server sleeps.
let whitelistedHWIDs = new Set();

// Endpoint for Roblox to check access
app.get('/verify', (req, res) => {
    const hwid = req.query.hwid;
    if (whitelistedHWIDs.has(hwid)) {
        res.send("Valid");
    } else {
        res.send("Invalid");
    }
});

// Endpoint for the website to add a user after they pass the "Key" check
app.get('/claim', (req, res) => {
    const hwid = req.query.hwid;
    if (!hwid) return res.send("No HWID provided");
    
    whitelistedHWIDs.add(hwid);
    console.log(`Added HWID: ${hwid}`);
    res.send("Success");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});