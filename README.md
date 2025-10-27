Makita Telegram Bot

Um bot de Telegram feito em Node.js usando Telegraf, com foco em desempenho, estabilidade e personalização.


---

Guia Completo de Instalação e Configuração

1️⃣ Criando o Bot no BotFather

1. Abre o Telegram e procura por @BotFather


2. Digita /start


3. Digita /newbot


4. Escolhe um nome pro bot (ex: Makita Telegram)


5. Escolhe um username que termine com 'bot' (ex: MakitaBot)


6. Copia o token que ele te envia, que será usado no arquivo .env




---

2️⃣ Instalando dependências no Termux

pkg update && pkg upgrade -y
pkg install nodejs git -y


---

3️⃣ Clonando o repositório

cd ~
git clone git@github.com:Rafasw7/Makita-Telegram.git
cd Makita-Telegram

Se não estiver usando SSH, pode clonar via HTTPS:

git clone https://github.com/Rafasw7/Makita-Telegram.git
cd Makita-Telegram


---

4️⃣ Instalando os módulos do projeto

No Termux às vezes rola problema com links simbólicos, então use o parâmetro --no-bin-links:

npm install --no-bin-links telegraf dotenv

Se houver package.json, basta usar:

npm install --no-bin-links


---

5️⃣ Criando e editando o arquivo .env

nano .env

Adicione o seguinte conteúdo:

BOT_TOKEN=SEU_TOKEN_AQUI

Salva e sai com CTRL + O → Enter, depois CTRL + X.


---

6️⃣ Estrutura básica do projeto

Makita-Telegram/
├── node_modules/
├── .env
├── package.json
├── index.js
└── README.txt


---

7️⃣ Código base do bot (index.js)

const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const startTime = Date.now();

const getUptime = () => {
  const uptime = Date.now() - startTime;
  const s = Math.floor(uptime / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  return `${d}d ${h % 24}h ${m % 60}m ${s % 60}s`;
};

bot.start((ctx) => ctx.reply('🤖 Olá! O Makita Bot está online!'));
bot.command('ping', async (ctx) => {
  const latency = Date.now() - ctx.message.date * 1000;
  const msg = await ctx.replyWithHTML('<i>Calculando...</i>', { reply_to_message_id: ctx.message.message_id });

  setTimeout(async () => {
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      msg.message_id,
      undefined,
      `🏓 <b>Pong!</b>\n\n⏱️ <b>Latência:</b> ${latency}ms\n⏰ <b>Uptime:</b> ${getUptime()}`,
      { parse_mode: 'HTML' }
    );
  }, 1000);
});

bot.launch()
  .then(() => console.log('🤖 Bot iniciado com sucesso!'))
  .catch((err) => console.error('❌ Erro ao iniciar o bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


---

8️⃣ Iniciando o bot

node index.js

Se aparecer:

🤖 Bot iniciado com sucesso!

O bot está online!


---

👨‍💻 Autor

Feito com ❤️ por Rafasw7.


---

🪪 Licença

Este projeto é distribuído sob a licença MIT.