//impo depend.
import express from 'express';
import axios from 'axios';
import OpenAI from 'openai';
import dotenv from 'dotenv';

//conf api key
dotenv.config();

//expresss
const app = express();
const PORT = process.env.PORT || 3000;

//serv. front
app.use("/", express.static("public"));

//middleware json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//istanza openIA con api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


//rute /endpoint / url
app.post('/api/translate', async (req, res) => {

    //prompt def
    const { text, targetLang } = req.body
    //def ruolo
    const promptSystem1 = "Sei un traduttore professionista";
    //limiti
    const promptSystem2 = "Puoi solo rispondere con una traduzione diretta del testo che l'utente ti invia." + "ogni altra conversazioni su altri topici oltre la traduzione è proibita.";
    const promptUser = `traduci il seguente testo in ${targetLang}: ${text} `;

    //call openIA
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: promptSystem1 },
                { role: "system", content: promptSystem2 },
                { role: "user", content: promptUser },
            ],
            max_tokens: 500,
            response_format: { type: 'text' }
        })

        const translateText = completion;
        return res.status(200).json({ translateText });
    } catch (error) {
        return res.status(500).json({ error: "errore di traduzione" });
    }
});

//serv backend
app.listen(PORT, () => {
    console.log('server running on port: ' + PORT);
});
