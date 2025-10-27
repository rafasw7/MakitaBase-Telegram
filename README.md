# Makita Telegram Bot

![Makita Logo](https://github.com/user-attachments/assets/b662c226-f336-4dd1-980d-cfe52fb158f1)

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)]()
[![Telegraf](https://img.shields.io/badge/Telegraf-0088cc?style=for-the-badge&logo=telegram&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()

Um bot para Telegram feito em Node.js com Telegraf — focado em desempenho, estabilidade e fácil personalização. Inspirado na Makita Base, esta base é simples de usar e fácil de estender.

---

## Índice

- Sobre
- Recursos
- Guia de instalação
  - Criar o bot no BotFather
  - Instalar dependências (Termux)
  - Clonar o repositório
  - Instalar módulos do projeto
  - Criar o arquivo .env
- Estrutura do projeto
- Código base (makita.js)
- Executar o bot
- Comandos de exemplo
- Contribuição
- Autor & Contato
- Licença

---

## Sobre

Esta base fornece um ponto de partida leve e estável para criar bots de Telegram usando Telegraf. Ideal para automações, utilitários, bots interativos e protótipos rápidos, mantendo código organizado para fácil manutenção e expansão.

---

## Recursos

- Inicialização e parada segura (tratamento de SIGINT/SIGTERM)
- Comando de ping com latência e uptime
- Estrutura simples para adicionar comandos e middlewares
- Fácil configuração via arquivo .env
- Compatível com Termux (com instruções para --no-bin-links)

---

## 1) Criando o bot no BotFather

1. Abra o Telegram e procure por @BotFather  
2. Digite /start  
3. Digite /newbot  
4. Escolha um nome para o bot (ex: Makita Telegram)  
5. Escolha um username que termine com "bot" (ex: MakitaBot)  
6. Copie o token enviado pelo BotFather — será usado no arquivo .env

---

## 2) Instalando dependências no Termux

No Termux execute:

```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
```

---

## 3) Clonando o repositório

Via SSH:
```bash
cd ~
git clone git@github.com:Rafasw7/Makita-Telegram.git
cd Makita-Telegram
```

Via HTTPS:
```bash
git clone https://github.com/Rafasw7/Makita-Telegram.git
cd Makita-Telegram
```

---

## 4) Instalando os módulos do projeto

Se não houver package.json, instale o Telegraf e dotenv:

```bash
npm install --no-bin-links telegraf dotenv
```

Se já houver package.json:

```bash
npm install --no-bin-links
```

(O parâmetro --no-bin-links ajuda em ambientes como Termux que podem ter problemas com links simbólicos.)

---

## 5) Criando e editando o arquivo .env

Crie o arquivo `.env` na raiz do projeto:

```bash
nano .env
```

Adicione:

```
BOT_TOKEN=SEU_TOKEN_AQUI
```

Salve e saia (CTRL+O → Enter, CTRL+X no nano).

> Dica de segurança: nunca compartilhe o token publicamente e não o commite em repositórios públicos.

---

## Estrutura básica do projeto

```
Makita-Telegram/
├── node_modules/
├── assets/                 # GIFs, imagens e outros recursos
├── .env
├── package.json
├── makita.js
└── README.md
```

---

## Código base (makita.js)

```javascript
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

bot.start((ctx) => ctx.reply('🤖 Olá! O Makita Telegram está online!'));

bot.command('ping', async (ctx) => {
  const latency = Date.now() - (ctx.message.date * 1000);
  const msg = await ctx.replyWithHTML('<i>Calculando...</i>', { reply_to_message_id: ctx.message.message_id });

  setTimeout(async () => {
    try {
      await ctx.telegram.editMessageText(
        ctx.chat.id,
        msg.message_id,
        undefined,
        `🏓 <b>Pong!</b>\n\n⏱️ <b>Latência:</b> ${latency}ms\n⏰ <b>Uptime:</b> ${getUptime()}`,
        { parse_mode: 'HTML' }
      );
    } catch (err) {
      // Se editar falhar (mensagem removida/etc), apenas envie uma resposta nova
      await ctx.replyWithHTML(`🏓 <b>Pong!</b>\n\n⏱️ <b>Latência:</b> ${latency}ms\n⏰ <b>Uptime:</b> ${getUptime()}`);
    }
  }, 800);
});

bot.launch()
  .then(() => console.log('🤖 Bot iniciado com sucesso!'))
  .catch((err) => console.error('❌ Erro ao iniciar o bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
```

---

## Executando o bot

```bash
node makita.js
```

Se aparecer:
```
🤖 Bot iniciado com sucesso!
```
— então o bot está online.

---

## Comandos de exemplo

- /ping — verifica latência e uptime

Adicione novos comandos em makita.js ou em módulos separados, usando middlewares do Telegraf para organização.

---

## Contribuição

Contribuições são bem-vindas! Sugestões:
- Abra uma issue descrevendo o que deseja ou o bug encontrado
- Faça um fork, crie uma branch com sua feature/fix e abra um pull request
- Mantenha o token e dados sensíveis fora do repo

Se quiser posso criar um arquivo CONTRIBUTING.md com um guia padrão.

---

## Autor & Contato

Feito com ❤️ por Rafasw7 (Raphael)  
Instagram: @rafasw7
WhatsApp: +55 62 8205-3713

---

## Licença

Distribuído sob a licença MIT. Veja o arquivo LICENSE para detalhes.

---

<p align="center">
  <img src="assets/makita-telegram.gif" alt="Makita em obra - animado" width="420" style="border-radius: 12px;">
</p>
