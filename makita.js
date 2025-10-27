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
process.once('SIGTERM', () => bot.stop('SIGTERM'));  }, 1000);
});

bot.launch()
  .then(() => console.log('🤖 Bot iniciado com sucesso!'))
  .catch((err) => console.error('❌ Erro ao iniciar o bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
