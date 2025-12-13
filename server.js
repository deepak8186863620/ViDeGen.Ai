// 1. Install dependencies: npm install express cors dotenv @google/generative-ai
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
// Enable CORS for frontend connection (allowing http://localhost:3000 access)
app.use(cors()); 
app.use(express.json());


// 2. Configure Gemini with YOUR Secret Key (stored in .env file)
// Uses gemini-2.5-flash-preview-09-2025 for text generation.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 3. Create YOUR Custom Endpoint
app.post('/api/generate-website', async (req, res) => {
    try {
        // IMPORTANT: Ensure API Key is available via environment variable
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "Server Error: GEMINI_API_KEY is not set in the .env file." });
        }
        
        const { prompt, settings } = req.body;

        if (!prompt || !settings) {
            return res.status(400).json({ error: "Missing 'prompt' or 'settings' in request body." });
        }

        // --- ENHANCED SYSTEM PROMPT FOR LOGIC AND FUNCTIONALITY ---
        const systemPrompt = `
        You are ViDeGen.AI, an advanced web architect engine created by Deepak Prajapati. 
        Your task is to generate a single-file, fully functional web application based on the user's prompt and the configuration below.

        USER PROMPT: "${prompt}"

        CONFIGURATION:
        - Framework: ${settings.framework}
        - Color Palette: ${settings.colorPalette} (Use these colors and Tailwind utilities to make the UI stunning.)
        - Micro-Animations: ${settings.includeAnimations ? 'Enabled (Use CSS transitions/animations for interactivity)' : 'Disabled'}
        - SEO Optimization: ${settings.optimizeSEO ? 'Enabled (Include proper meta tags and semantic HTML)' : 'Disabled'}
        - JS Library: ${settings.jsLibrary !== 'None' ? settings.jsLibrary : 'None'} (Integrate this library if relevant to the prompt.)

        *** MANDATORY GENERATION RULES FOR FUNCTIONALITY AND STRUCTURE ***

        1. COMPLETENESS & RUNNABILITY: The code MUST be a complete, self-contained, and immediately runnable application. It must include all necessary structural tags, styling, and logic.

        2. LOGIC INCLUSION: The application MUST contain interactive logic (e.g., form handling, state management, event listeners, calculations, game mechanics, data fetching mocks) that fulfills the user's prompt. A static page is unacceptable.

        3. SINGLE FILE MANDATE:
           - HTML: ALL HTML, Tailwind CSS, and JavaScript MUST be in a single .html file.
           - React/Angular: ALL components, styling, logic, and exports MUST be in a single .jsx/.tsx file.

        4. STATE MANAGEMENT: Implement state management appropriate for the chosen framework (e.g., JavaScript variables/listeners for HTML, useState/Signals for React/Angular).

        5. INTERNAL FUNCTIONALITY (CRITICAL): ALL forms, buttons, and links (even placeholder ones) MUST be handled by JavaScript. 
           - **NEVER** use \`href="#"\`, \`href="/"\`, or \`href="javascript:void(0)"\` without an accompanying event listener that calls \`e.preventDefault()\` or similar.
           - **Search/Submit actions** must implement mock functionality (e.g., filtering a local array of items, or displaying a temporary "Search results for X" message on the page). They must not cause any page reload or external navigation.

        6. RESPONSE FORMAT: The final output MUST be a strict JSON object with two keys: "code" and "description".
        
           {
             "code": "/* The entire, unescaped code for the single file application. */",
             "description": "/* A brief, friendly summary of the application and its features. */"
           }
        
        7. FILE TYPE: The content of the "code" field must correspond to the requested framework type: ${settings.framework}. Use comments extensively to explain the logic and state flow.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });
        
        // We use the same configuration as before, forcing JSON output
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: { responseMimeType: "application/json" }
        });

        const responseText = result.response.text();
        
        // Clean up markdown ticks if present before parsing
        const cleanText = responseText.replace(/```json|```/g, '').trim();

        // Attempt to parse the clean JSON text
        let jsonResponse;
        try {
            jsonResponse = JSON.parse(cleanText);
        } catch (e) {
            console.error("JSON Parsing Error:", e);
            // If parsing fails, send the raw response text back for debugging
            return res.status(500).json({ 
                error: "The model did not return valid JSON.", 
                raw_output: responseText 
            });
        }

        // Send the parsed JSON back to your frontend
        res.json(jsonResponse);

    } catch (error) {
        console.error("Server Error:", error.message, error.stack);
        // Respond with a detailed 500 error
        res.status(500).json({ error: "Failed to generate website due to an internal API error.", detail: error.message });
    }
});

app.listen(3000, () => console.log('ViDeGen API running on port 3000 (http://localhost:3000)'));