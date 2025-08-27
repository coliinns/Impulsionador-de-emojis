// ================================
// Bot Impulsionador de Emojis
// ================================
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const express = require("express");
require("dotenv").config();

// --- Config do Client ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions, // necessário pra reagir
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
    ],
});

// --- IDs dos canais ---
const FARMANDO_CHANNEL = "1410146457440227368";
const GARAGENS_CHANNEL = "1377721089257509110";

// --- Emojis por canal ---
const FARMANDO_EMOJIS = [
    "<a:confetiss:1410158284001771530>",
    "<a:trofeuu:1410158502399442984>",
    "<a:MoneySoaring:1405178077394505818>",
    "<a:moneybag:1405178051935076392>",
    "<a:emoji_37:1410158529687322706>",
    "<a:emoji_35:1410158284001771530>",
    "<a:gifstay401:1410179781068329070>",
    "<a:emoji_39:1410158810856951880>"
];

const GARAGENS_EMOJIS = ["🚘", "<a:emoji_35:1410158284001771530>", "<a:fbWOW:1410193023538823208>", "🤩", "<a:estrela:1410193047551213640>" , "<a:light_yellow_sparkles:1410193076244320306>", "<a:gifstay401:1410179781068329070>", "<a:emoji_39:1410158810856951880>"];

// --- Checagem do TOKEN e login ---
if (!process.env.TOKEN) {
    console.error("❌ Nenhum TOKEN encontrado no ambiente!");
    process.exit(1);
} else {
    console.log("🔑 Tentando logar no Discord...");
    client.login(process.env.TOKEN)
        .then(() => console.log("✅ Login enviado, aguardando evento ready..."))
        .catch(err => console.error("❌ Falha ao enviar login:", err));
}

// --- Eventos do bot ---
client.once("ready", () => {
    console.log(`✅ Bot logado como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author?.bot) return;

    const inFarmando = message.channel.id === FARMANDO_CHANNEL;
    const inGaragens = message.channel.id === GARAGENS_CHANNEL;
    if (!inFarmando && !inGaragens) return;

    // --- Detecta imagens ---
    const hasAttachmentImage = message.attachments.size > 0;
    const hasEmbedImage = message.embeds.some(e => e.image || e.thumbnail);
    const hasDirectLink = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i.test(message.content);

    if (!(hasAttachmentImage || hasEmbedImage || hasDirectLink)) return;

    const emojis = inFarmando ? FARMANDO_EMOJIS : GARAGENS_EMOJIS;

    // --- Loop de reação seguro ---
    for (const emoji of emojis) {
        try {
            await message.react(emoji);
        } catch (err) {
            console.error(`⚠️ Não consegui reagir com ${emoji}:`, err.message);
        }
    }

    console.log(`✨ Reagi a uma imagem em #${message.channel.name}`);
});

// --- Servidor Web (Render / Uptime) ---
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("🤖 Emoji Impulsionador online!"));
app.get("/health", (req, res) => res.json({ ok: true, uptime: process.uptime() }));

app.listen(PORT, () => console.log(`🌐 Servidor web online na porta ${PORT}`));
