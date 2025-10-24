import { Client, Events, GatewayIntentBits } from 'discord.js';
import express from 'express';
import { redirectToOriginalUrl, createShortUrl } from './contollers/url.js';
import connectToDatabase  from './connection.js';
import 'dotenv/config';
const client = new Client({ intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] });
client.on("messageCreate", (message) => {
    if(message.author.bot) return;
    console.log(`Message received: ${message.content}`);
    if(message.content.startsWith("create"))
    {
        const url = message.content.split("create ")[1];
        console.log(`URL received for creation: ${url

        }`);
        message.reply("createing your short url...");
        createShortUrl(url).then(shortId => {
            message.reply(`Short URL created: http://localhost:3000/${shortId}`);
        }).catch(error => {
            console.error("Error creating short URL:", error);
            message.reply("Failed to create short URL.");
        });
        return;

    }
    message.reply("Hello! This is an automated response.");
});
client.on("interactionCreate", async interaction => {
    console.log(interaction);
    interaction.reply("Pong!!");
});
console.log("Logging in to Discord...with", process.env.BOT_TOKEN);
client.login(process.env.BOT_TOKEN);
//application code for redirect service

const app = express();
const PORT = process.env.PORT || 3000;
connectToDatabase();
app.use("/:id",redirectToOriginalUrl);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
