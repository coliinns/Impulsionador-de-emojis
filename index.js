const { Client, GatewayIntentBits } = require("discord.js");
const express = require("express");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// IDs dos canais
const FARMANDO_CHANNEL = "1409163683854290954";
const GARAGENS_CHANNEL = "1377721089257509110";

// Emojis de cada canal
const FARMANDO_EMOJIS = ["🎉", "🥇", "💵", "💰", "👏🏻", "🔥", "🚀", "🎰"];
const GARAGENS_EMOJIS = ["🚘", "😮", "👏🏻", "🤩", "✨", "🔥", "🚀"];

client.once("ready", () => {
    console.log(`✅ Bot logado como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return; // Ignora bots

    const hasImage =
        message.attachments.size > 0 ||
        message.embeds.some((e) => e.data?.image || e.data?.thumbnail);

    if (!hasImage) return;

    try {
        if (message.channel.id === FARMANDO_CHANNEL) {
            for (const emoji of FARMANDO_EMOJIS) {
                await message.react(emoji);
            }
        }

        if (message.channel.id === GARAGENS_CHANNEL) {
            for (const emoji of GARAGENS_EMOJIS) {
                await message.react(emoji);
            }
        }
    } catch (err) {
        console.error("Erro ao adicionar reações:", err);
    }
});

// --- Servidor Web para manter vivo no Render ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("🤖 Emoji Bot está rodando!");
});

app.listen(PORT, () => {
    console.log(`🌐 Servidor web online na porta ${PORT}`);
});

// Login do bot
client.login(process.env.TOKEN);
