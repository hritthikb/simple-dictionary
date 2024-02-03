import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/word/:word', async (req, res) => {
    const word = req.params.word;
    const apiKey = '88caf404-f80f-432a-bbbe-916cfb3d3ae2';
    const apiUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            const audioUrl = data[0].hwi.prs[0].sound.audio;
            const shortdef = data[0].shortdef;
            res.json({ shortdef, audioUrl });
        } else {
            console.error(`API request failed with status ${response.status}`);
            res.status(500).json({ error: 'API request failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(3000, () => console.log('Server started on port 3000'));
