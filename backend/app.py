from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from database import init_db, get_user_by_telegram, create_user, get_section, save_section
from auth import verify_init_data

app = Flask(__name__)
CORS(app, origins=['*'])

# Инициализация БД при старте
init_db()


# ============================================================
# Утилита: получить текущего пользователя по initData
# ============================================================
def require_user():
    """Возвращает dict пользователя или кортеж (json, status)."""
    payload = request.get_json(silent=True) or {}
    init_data = payload.get('initData') or request.headers.get('X-Telegram-Init-Data')

    if not init_data:
        return None, (jsonify({'error': 'No initData'}), 401)

    tg_user = verify_init_data(init_data)
    if not tg_user:
        return None, (jsonify({'error': 'Invalid initData'}), 401)

    telegram_id = tg_user.get('id')
    if not telegram_id:
        return None, (jsonify({'error': 'No user id'}), 401)

    user = get_user_by_telegram(telegram_id)
    if not user:
        user = create_user(
            telegram_id=telegram_id,
            username=tg_user.get('username'),
            first_name=tg_user.get('first_name'),
            last_name=tg_user.get('last_name'),
        )
    return user, None


# ============================================================
# HEALTH
# ============================================================
@app.route('/api/health')
def health():
    return jsonify({'status': 'ok'})

# ============================================================
# DEBUG — временно, чтобы увидеть, что приходит от Telegram
# ============================================================
@app.route('/api/debug/last', methods=['POST', 'GET'])
def debug_last():
    payload = request.get_json(silent=True) or {}
    init_data = payload.get('initData') or request.headers.get('X-Telegram-Init-Data') or ''
    from auth import verify_init_data
    verified = verify_init_data(init_data) if init_data else None
    return jsonify({
        'has_init_data': bool(init_data),
        'init_data_length': len(init_data),
        'init_data_preview': init_data[:80] if init_data else '',
        'verified_user': verified,
        'bot_token_len': len(os.getenv('BOT_TOKEN', '')),
    })

# ============================================================
# AUTH — проверка входа
# ============================================================
@app.route('/api/auth', methods=['POST'])
def auth():
    user, err = require_user()
    if err:
        return err
    return jsonify({'user': user, 'ok': True})


# ============================================================
# ME — данные текущего пользователя
# ============================================================
@app.route('/api/me', methods=['GET', 'POST'])
def me():
    user, err = require_user()
    if err:
        return err
    return jsonify(user)


# ============================================================
# GET /api/data/<section> — получить данные раздела
# ============================================================
@app.route('/api/data/<section>', methods=['GET', 'POST'])
def get_data(section):
    user, err = require_user()
    if err:
        return err
    data = get_section(user['id'], section)
    return jsonify({'data': data})


# ============================================================
# PUT /api/data/<section> — сохранить данные раздела
# ============================================================
@app.route('/api/data/<section>', methods=['PUT'])
def put_data(section):
    user, err = require_user()
    if err:
        return err
    payload = request.get_json(silent=True) or {}
    data = payload.get('data')
    if data is None:
        return jsonify({'error': 'No data'}), 400
    save_section(user['id'], section, data)
    return jsonify({'ok': True})

@app.route('/api/debug/db')
def debug_db():
    """Временный маршрут для проверки содержимого БД."""
    from database import get_db
    conn = get_db()
    users = conn.execute('SELECT id, telegram_id, username, first_name FROM users').fetchall()
    data = conn.execute('SELECT user_id, section, length(data) FROM user_data').fetchall()
    conn.close()
    return jsonify({
        'users': [dict(u) for u in users],
        'data': [dict(d) for d in data],
    })

# ============================================================
# ЗАПУСК
# ============================================================
if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port)


@app.route('/')
def root():
    return jsonify({
        'service': 'LifeOS API',
        'status': 'running',
        'endpoints': ['/api/health', '/api/auth', '/api/data/<section>']
    })
