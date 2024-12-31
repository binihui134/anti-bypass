const express = require('express');
const fetch = require('node-fetch'); // Ensure this is installed via `npm install node-fetch`

const app = express();
const PORT = 3000;

app.use(express.json()); // To parse JSON request bodies

app.post('/check-bypass', async (req, res) => {
    const apiUrl = 'https://publisher.linkvertise.com/api/v1/anti_bypassing';
    const { hash } = req.body;
    const token = '159725295b5dfac337822c6ff708b8d07b4b944297000d8c53a7237a76ad76bd'; // Replace with your actual token

    if (!hash) {
        return res.status(400).json({ error: 'Hash is required' });
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                hash: hash,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Send the appropriate response to the client
        if (result === true) {
            res.json({ message: 'Success, redirecting you right now...' });
            res.redirect('https://www.mediafire.com/file/9nkoeo6q6dyyrrn/Rinara.zip/file');
        } else if (result === false) {
            res.json({ message: 'Bypass detected, please try again.' });
        } else {
            res.json({ message: `Unexpected response: ${result}` });
        }
    } catch (error) {
        res.status(500).json({ error: `Error validating hash: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
