const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, newGameOptions } = require('./options.js');

const token = '5059977851:AAG12FB3yLYDIyyIF5PR5uQF00rvYVbQczs';

const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
  { command: '/start', description: 'Start' },
  { command: '/info', description: 'Info' },
  { command: '/game', description: 'Game' },
]);

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Вгадайте цифру');
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Виберіть Ваш варіант', gameOptions);
};

const start = async () => {
  bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === '/start') {
      await bot.sendSticker(
        chatId,
        'https://tlgrm.ru/_/stickers/88e/586/88e586f0-4299-313f-bedb-ef45c7710422/1.webp',
      );
      return bot.sendMessage(chatId, 'Вітаю!!!');
    }
    if (text === '/info') {
      return bot.sendMessage(
        chatId,
        `Ви - ${msg.from.first_name} ${msg.from.last_name}`,
      );
    }

    if (text === '/game') {
      return startGame(chatId);
    }
  });

  bot.on('callback_query', (msg) => {
    const { data } = msg;
    const chatId = msg.message.chat.id;
    if (chats[chatId] === Number(data)) {
      return bot.sendMessage(chatId, 'Вітаю!!!');
    } else {
      return bot.sendMessage(
        chatId,
        `Невірно, загадана цифра ${chats[chatId]}. Спробуєти ще?`,
        newGameOptions,
      );
    }
  });

  bot.on('callback_query', (msg) => {
    if (msg.data === 'newGame') {
		 return 
	 }
  });
};

start();
