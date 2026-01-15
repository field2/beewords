const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const WORDS_FILE = path.join(__dirname, 'words.txt');

app.use(express.json());
app.use(express.static(__dirname));

// Get all words
app.get('/api/words', async (req, res) => {
    try {
        const content = await fs.readFile(WORDS_FILE, 'utf-8');
        const words = content.split('\n')
            .map(word => word.trim())
            .filter(word => word.length > 0);
        res.json({ words });
    } catch (error) {
        console.error('Error reading words:', error);
        res.status(500).json({ error: 'Failed to read words' });
    }
});

// Add a new word
app.post('/api/words', async (req, res) => {
    try {
        const { word } = req.body;
        
        if (!word || !word.trim()) {
            return res.status(400).json({ error: 'Word is required' });
        }

        const trimmedWord = word.trim();
        
        // Read existing words
        const content = await fs.readFile(WORDS_FILE, 'utf-8');
        const words = content.split('\n')
            .map(w => w.trim())
            .filter(w => w.length > 0);
        
        // Check if word already exists (case-insensitive)
        if (words.some(w => w.toLowerCase() === trimmedWord.toLowerCase())) {
            return res.status(409).json({ error: 'Word already exists' });
        }
        
        // Append the new word
        await fs.appendFile(WORDS_FILE, `\n${trimmedWord}`);
        
        res.json({ success: true, word: trimmedWord });
    } catch (error) {
        console.error('Error adding word:', error);
        res.status(500).json({ error: 'Failed to add word' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});
