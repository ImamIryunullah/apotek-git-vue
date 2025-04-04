import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyA_2ubQc5EYaemv0vOq26zCu_LCck-QWaM";

const genAI = new GoogleGenerativeAI(API_KEY);

export default {
  async generateText(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  },
};
