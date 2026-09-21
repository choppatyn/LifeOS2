import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

BOT_TOKEN = os.getenv('BOT_TOKEN')
WEB_APP_URL = os.getenv('WEB_APP_URL', 'https://lifeos-production-be9b.up.railway.app')


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Главное меню с кнопкой открытия Mini App."""
    user = update.effective_user

    keyboard = [[
        InlineKeyboardButton(
            text="🌿 Открыть Life OS",
            web_app=WebAppInfo(url=WEB_APP_URL)
        )
    ]]
    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text(
        f"👋 Привет, {user.first_name}!\n\n"
        f"Добро пожаловать в Life OS — операционную систему твоей жизни.\n\n"
        f"Нажми кнопку ниже, чтобы открыть приложение:",
        reply_markup=reply_markup
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "🤖 *Life OS*\n\n"
        "/start — открыть приложение\n"
        "/help — эта справка\n\n"
        "🌿 Внутри приложения ты можешь вести профиль, достижения, "
        "привычки, отношения, путешествия и многое другое.",
        parse_mode='Markdown'
    )


def main():
    if not BOT_TOKEN:
        logger.error("BOT_TOKEN не установлен!")
        return

    logger.info("🚀 Запуск бота...")
    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("help", help_command))

    logger.info("🤖 Бот запущен. Ожидание сообщений...")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()
