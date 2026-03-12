import type {
	TelegramCompleteRequest,
	TelegramCompleteResponse
} from '@vendee-cinema/contracts/gen/auth'
import type { Telegraf } from 'telegraf'

import { authClient } from '@/infrastructure/grpc/auth.client'
import type { TelegrafContext } from '@/shared/interfaces'
import { callUnary } from '@/shared/utils'

export function registerContactHandler(bot: Telegraf<TelegrafContext>) {
	bot.on('contact', async context => {
		const phone = context.message.contact.phone_number
		if (!context.chat.id || !context.session.id)
			return context.reply(
				'An error occured. Please begin the process from Vendee website'
			)

		const request: TelegramCompleteRequest = {
			sessionId: context.session.id,
			phone
		}

		const { sessionId } = await callUnary<TelegramCompleteResponse>(
			authClient.telegramComplete.bind(authClient),
			request
		)

		await context.reply('Signing up completed successfully!', {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'Go to Vendee website',
							url: `https://vendee-cinema.com/auth/tg-finalize?sessionId=${sessionId}`
						}
					]
				],
				remove_keyboard: true
			}
		})
	})
}
