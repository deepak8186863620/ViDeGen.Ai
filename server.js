require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/generate-website', async (req, res) => {
  try {
    const { prompt, settings } = req.body;

    if (!prompt || !settings) {
      return res.status(400).json({ error: "Missing prompt or settings" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-09-2025"
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    res.json(JSON.parse(result.response.text()));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
