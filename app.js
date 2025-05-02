//step 1  importo dependencies
import express from 'express';
import axios from 'axios';
import OpenAI from 'openai';
import dotenv from 'dotenv';

//caricare conf api key
dotenv.config();

//caricare expresss
const app = express();
const PORT = process.env.PORT || 3000;

//server per frontend
app.use("/", express.static("public"));

//middleware per processare in json

//istanza open ia e passargli api key

//rute /endpoint / url

//funzionalità per tradurre con ia
//call LLM di open IA

//server per il backend
app.listen(PORT, () => {
    console.log('server running on port: ' + PORT);
});
