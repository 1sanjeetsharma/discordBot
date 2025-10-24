import { Client, Events, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] });
client.on("messageCreate", (message) => {
    if(message.author.bot) return;
    console.log(`Message received: ${message.content}`);
    message.reply("Hello! This is an automated response.");
});
client.on("interactionCreate", async interaction => {
    console.log(interaction);
    interaction.reply("Pong!!");
});
client.login(process.env.BOT_TOKEN);