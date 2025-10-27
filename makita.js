const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const startTime = Date.now();

const getUptime = () => {
  const uptime = Date.now() - startTime;
  const seconds = Math.floor(uptime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
};

bot.command('ping', async (ctx) => {
  const now = new Date();
  const latency = Date.now() - ctx.message.date * 1000;

  const msg = await ctx.replyWithHTML('<i>Calculando...</i>', {
    reply_to_message_id: ctx.message.message_id,
  });

  setTimeout(async () => {
    await ctx.telegram.editMessageText(
      ctx.chat.id,
      msg.message_id,
      undefined,
      `🏓 <b>Pong!</b>

⏱️ <b>Latência:</b> ${latency}ms
🕒 <b>Horário:</b> ${now.toLocaleString('pt-BR')}
⏰ <b>Uptime:</b> ${getUptime()}
📊 <b>Memória:</b> ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`,
      { parse_mode: 'HTML' }
    );
  }, 1000);
});

bot.launch()
  .then(() => console.log('🤖 Bot iniciado com sucesso!'))
  .catch((err) => console.error('❌ Erro ao iniciar o bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));