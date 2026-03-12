import { Telegraf } from 'telegraf'

export function RegisterStartHandler(bot: Telegraf) {
	bot.start(async context => {
		await context.reply('Hello')
	})
}
