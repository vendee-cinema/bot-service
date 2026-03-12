import { Telegraf } from 'telegraf'

import { RegisterStartHandler } from './start.handler'

export function registerBotHandlers(bot: Telegraf) {
	RegisterStartHandler(bot)
}
