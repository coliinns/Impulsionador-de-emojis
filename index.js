const { Client, GatewayIntentBits, Partials } = require("discord.js");
const express = require("express");
require("dotenv").config();

// --- Checagem do TOKEN ---
if (!process.env.TOKEN) {
    console.error("❌ Nenhum TOKEN encontrado no ambiente!");
    process.exit(1);
} else {
    console.log("🔑 TOKEN detectado, tentando logar...");
}

// --- Config do Client ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

// --- IDs dos canais ---
const FARMANDO_CHANNEL = "1377721036044505098";
const GARAGENS_CHANNEL = "1377721089257509110";

// --- Emojis por canal ---
const FARMANDO_EMOJIS = ["🎉", "🥇", "💵", "💰", "👏🏻", "🔥", "🚀", "🎰"];
const GARAGENS_EMOJIS = ["🚘", "😮", "👏🏻", "🤩", "✨", "🔥", "🚀"];

// --- Eventos do bot ---
client.once("ready", () => {
    console.log(`✅ Bot logado como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author?.bot) return;

    const hasAttachmentImage = message.attachments.size > 0 && [...message.attachments.values()].some(att => {
        const url = att.url?.toLowerCase() || "";
        return url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".gif") || url.endsWith(".webp");
    });

    const hasEmbedImage = message.embeds?.some(e => {
        try {
            return Boolean(e?.data?.image || e?.data?.thumbnail);
        } catch {
            return false;
        }
    });

    const hasImage = hasAttachmentImage || hasEmbedImage;
    if (!hasImage) return;

    try {
        if (message.channel?.id === FARMANDO_CHANNEL) {
            for (const emoji of FARMANDO_EMOJIS) await message.react(emoji);
        } else if (message.channel?.id === GARAGENS_CHANNEL) {
            for (const emoji of GARAGENS_EMOJIS) await message.react(emoji);
        }
    } catch (err) {
        console.error("Erro ao adicionar reações:", err);
    }
});

// --- Servidor Web (Render / Uptime) ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("🤖 Emoji Impulsionador online!"));
app.get("/health", (req, res) => res.json({ ok: true, uptime: process.uptime() }));

app.listen(PORT, () => console.log(`🌐 Servidor web online na porta ${PORT}`));

// --- Login ---
client.login(process.env.TOKEN).catch(err => {
    console.error("❌ Falha ao logar no Discord. Verifique o TOKEN.", err);
});
