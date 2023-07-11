import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

//Dfault method to make simple express server
const app = express();

env.config();

app.use(cors());  // it should use the cors method so that it should not raise warning of cross origin.
app.use(bodyParser.json());

// Configure open api
const configuration = new Configuration({
  organization: "org-aS27Lbjhw4liBkwNl2t268Mv",
  apiKey: process.env.API_KEY, // VISIT .env AND MAKE CHANGES
});
const openai = new OpenAIApi(configuration);/// Now our account is fully connected to our server

// listeninng
app.listen("3080", () => console.log("listening on port 3080"));

// dummy route to test
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//post route for making requests
app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",  // current gpt version is working on this model
      prompt: `${message}`,       // for question
      max_tokens: 100,            // Amount of words the model can give in reswponse section.
      temperature: 0.5,
    });
    res.json({ message: response.data.choices[0].text });
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});