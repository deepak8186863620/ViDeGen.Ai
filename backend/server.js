require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer'); // For handling image uploads
const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai'); // Your existing SDK
const { GoogleGenAI } = require('@google/genai'); // New SDK for Image Gen

const app = express();
const upload = multer({ dest: 'uploads/' }); // Temp storage for editing images

app.use(cors());
app.use(express.json());

// --- 1. SETUP CLIENTS ---
// Client for Text/Code (Your existing website generator)
const oldGenAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Client for Images (The new experimental features)
const imageGenClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// --- 2. EXISTING ROUTE: GENERATE WEBSITE ---
app.post('/api/generate-website', async (req, res) => {
  try {
    const { prompt, settings } = req.body;

    if (!prompt || !settings) {
      return res.status(400).json({ error: "Missing prompt or settings" });
    }

    // Keeping your specific model choice
    const model = oldGenAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp" // Updated to a known working model for code (or keep your 2.5 preview if you have access)
    });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    res.json(JSON.parse(result.response.text()));
  } catch (err) {
    console.error("Website Gen Error:", err);
    res.status(500).json({ error: "Website generation failed" });
  }
});

// --- 3. NEW ROUTE: GENERATE IMAGE (Text -> Image) ---
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // Using Gemini 2.0 Flash Experimental for native image generation
    const response = await imageGenClient.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      config: {
        responseModalities: ["IMAGE"], // This tells Gemini to give us pixels, not text
      }
    });

    const candidates = response.candidates;
    if (candidates && candidates[0]?.content?.parts?.[0]?.inlineData) {
      const imgData = candidates[0].content.parts[0].inlineData.data;
      const mimeType = candidates[0].content.parts[0].inlineData.mimeType || "image/png";

      // Send base64 image back to frontend
      res.json({ imageUrl: `data:${mimeType};base64,${imgData}` });
    } else {
      throw new Error("No image data received from Gemini.");
    }

  } catch (err) {
    console.error("Image Gen Error:", err);
    res.status(500).json({ error: "Image generation failed" });
  }
});

// --- 4. NEW ROUTE: EDIT IMAGE (Image + Text -> New Image) ---
// This is perfect for "Change the background of this hero section"
app.post('/api/edit-image', upload.single('image'), async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const file = req.file;

    if (!file || !prompt) {
      return res.status(400).json({ error: "Image and prompt are required" });
    }

    // Convert file to base64 for the API
    const imageBuffer = fs.readFileSync(file.path);
    const imageBase64 = imageBuffer.toString('base64');

    const response = await imageGenClient.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [
        { text: prompt },
        { inlineData: { mimeType: file.mimetype, data: imageBase64 } }
      ],
      config: {
        responseModalities: ["IMAGE"], // Request modified image back
      }
    });

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    const candidates = response.candidates;
    if (candidates && candidates[0]?.content?.parts?.[0]?.inlineData) {
      const imgData = candidates[0].content.parts[0].inlineData.data;
      const mimeType = candidates[0].content.parts[0].inlineData.mimeType || "image/png";
      res.json({ imageUrl: `data:${mimeType};base64,${imgData}` });
    } else {
      throw new Error("No edited image generated.");
    }

  } catch (err) {
    console.error("Image Edit Error:", err);
    // Attempt to clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "Image editing failed" });
  }
});

app.get('/ping', (req, res) => {
  res.send('Server is awake and listening! 🚀');
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});