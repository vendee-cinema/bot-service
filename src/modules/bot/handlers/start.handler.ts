import { Markup, Telegraf } from 'telegraf'

import type { TelegrafContext } from '@/shared/interfaces'

export function registerStartHandler(bot: Telegraf<TelegrafContext>) {
	bot.start(async context => {
		const sessionId = context.payload
		if (!sessionId)
			return context.reply(
				'Hi! Please sign up on Vendee website to continue',
				Markup.inlineKeyboard([
					Markup.button.url('Sign up', 'https://vendee-cinema.com/auth/signup')
				])
			)

		context.session.id = sessionId

		await context.reply(
			'Please share your phone number to complete registration',
			Markup.keyboard([[Markup.button.contactRequest('Share my phone number')]])
		)
	})
}
