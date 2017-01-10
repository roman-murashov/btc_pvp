'use strict';

const https = require('https');
const fs = require('fs');
const _ = require('lodash');

const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');
const token = process.env.TOKEN || config.token;
const btc_pvp_bot = new TelegramBot(token, { polling: true });

console.log('btc_pvp_bot starts...');


// Matches "/echo [whatever]"
btc_pvp_bot.onText(/\/echo (.+)/, function (msg, match) {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  var chatId = msg.chat.id;
  var resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  btc_pvp_bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of messages.
btc_pvp_bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  
  	if (msg.text === '/start') {
		sendMessage(chatId, config.welcomeMessage);
		return;
	}

  btc_pvp_bot.sendMessage(chatId, "Received your message");
});

/**
 * Wraper under bot sendMessage
 *
 * @param {Number} chatId Chat Id
 * @param {String} text Message text
 */
const sendMessage = (chatId, text) => {
	btc_pvp_bot.sendMessage(chatId, text, {parse_mode: 'Markdown'})
		.then(() => {
			console.log(`Message sent: ${text}`);
		})
		.catch(error => {
			console.log(`Text sending error: ${error}`);
		});
};