// server.js
require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint pour ALEXIA
app.post('/ask-alexia', async (req, res) => {
  try {
    const { question } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: "Tu es ALEXIA, l'assistante IA officielle du site SANI Issia Abdourahmane. " +
                  "Tu réponds en français avec bienveillance et précision. " +
                  "Signe toujours tes réponses par '🤖 ALEXIA, créée par SANI Issia Abdourahmane'."
        },
        { role: "user", content: question }
      ],
      temperature: 0.7
    });
    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Erreur avec ALEXIA. Réessayez plus tard." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ALEXIA écoute sur le port ${PORT}...`));
