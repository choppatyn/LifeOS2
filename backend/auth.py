import hmac
import hashlib
import json
import os
from urllib.parse import parse_qs


BOT_TOKEN = os.getenv('BOT_TOKEN', '')


def verify_init_data(init_data: str):
    """
    Проверяет подпись Telegram WebApp initData.
    Возвращает dict с данными пользователя или None.
    """
    if not init_data or not BOT_TOKEN:
        return None

    try:
        params = dict(parse_qs(init_data))
        params = {k: v[0] for k, v in params.items()}
    except Exception:
        return None

    received_hash = params.pop('hash', None)
    if not received_hash:
        return None

    # Собираем data_check_string
    sorted_items = sorted(params.items())
    data_check_string = '\n'.join(f'{k}={v}' for k, v in sorted_items)

    # Вычисляем секретный ключ
    secret_key = hmac.new(
        key=b'WebAppData',
        msg=BOT_TOKEN.encode('utf-8'),
        digestmod=hashlib.sha256
    ).digest()

    calculated_hash = hmac.new(
        key=secret_key,
        msg=data_check_string.encode('utf-8'),
        digestmod=hashlib.sha256
    ).hexdigest()

    if calculated_hash != received_hash:
        return None

    # Парсим user
    user_raw = params.get('user')
    if not user_raw:
        return None

    try:
        user = json.loads(user_raw)
    except Exception:
        return None

    return user
