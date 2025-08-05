const { GoogleGenAI } = require("@google/genai")
require('dotenv').config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
          Study the image's vibe (bold, flirty, chill, etc.)
          Write a short, human caption (≤15 words) that fits naturally.
          Use clever wordplay, emotion, or subtle double meanings if it boosts engagement.
          Add emojis and 1–3 hashtags only if they enhance the post — no spam.
          No generic lines, robotic tone, or explicit stuff.
          Captions must feel native, catchy, and scroll-stopping.

  `
    }

  });
  // console.log(response.text);
  return response.text
}

module.exports = generateCaption;