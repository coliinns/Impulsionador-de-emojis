# Emoji Impulsionador (Discord.js v14)

Bot que reage automaticamente com emojis quando **imagens** são postadas nos canais:
- **Farmando** (ID: `1377721036044505098`) → `🎉🥇💵💰👏🏻🔥🚀🎰`
- **Garagens** (ID: `1377721089257509110`) → `🚘😮👏🏻🤩✨🔥🚀`

Inclui **servidor web** (Express) para healthcheck e ping via UptimeRobot/Render.

## ⚙️ Configuração local
```bash
npm install
cp .env.example .env
# edite .env e coloque TOKEN=seu_token
npm start
```

## 🚀 Deploy no Render
1. Suba este repositório no GitHub.
2. No Render, crie **New + → Web Service** a partir do repositório.
3. Defina a variável de ambiente: `TOKEN` com o token do bot.
4. Start command: `npm start` (Render usa automaticamente a porta via `PORT`).
5. Use o endpoint `/health` ou `/` para monitoramento.

## 🔐 Permissões recomendadas no Invite
- View Channels
- Read Message History
- Add Reactions
- (opcional) Use External Emojis

## 📝 Observações
- O bot ignora mensagens de bots.
- Detecta imagens via anexos (`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`) e via embeds com `image/thumbnail`.
