import sqlite3
import os

DB_PATH = os.getenv('DB_PATH', 'lifeos.db')


def get_db():
    """Возвращает соединение с БД с row_factory для dict-доступа."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Создаёт все таблицы при первом запуске."""
    conn = get_db()
    c = conn.cursor()

    # Пользователи
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            telegram_id INTEGER UNIQUE NOT NULL,
            username TEXT,
            first_name TEXT,
            last_name TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Универсальная таблица для всех сущностей пользователя.
    # Так проще стартовать: не нужно создавать 10 отдельных таблиц.
    # Потом при желании можно разнести по отдельным таблицам.
    c.execute('''
        CREATE TABLE IF NOT EXISTS user_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            section TEXT NOT NULL,
            data TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ''')
    c.execute('CREATE INDEX IF NOT EXISTS idx_user_section ON user_data(user_id, section)')

    conn.commit()
    conn.close()
    print('[DB] Инициализирована')


def get_user_by_telegram(telegram_id: int):
    conn = get_db()
    user = conn.execute(
        'SELECT * FROM users WHERE telegram_id = ?',
        (telegram_id,)
    ).fetchone()
    conn.close()
    return dict(user) if user else None


def create_user(telegram_id: int, username: str, first_name: str, last_name: str):
    conn = get_db()
    c = conn.cursor()
    c.execute(
        'INSERT INTO users (telegram_id, username, first_name, last_name) VALUES (?, ?, ?, ?)',
        (telegram_id, username, first_name, last_name)
    )
    conn.commit()
    user_id = c.lastrowid
    conn.close()
    return get_user_by_telegram(telegram_id)


def get_section(user_id: int, section: str):
    """Возвращает JSON-данные раздела (массив или объект)."""
    conn = get_db()
    row = conn.execute(
        'SELECT data FROM user_data WHERE user_id = ? AND section = ?',
        (user_id, section)
    ).fetchone()
    conn.close()
    if not row:
        return None
    import json
    try:
        return json.loads(row['data'])
    except Exception:
        return None


def save_section(user_id: int, section: str, data):
    """Сохраняет JSON-данные раздела (перезапись)."""
    import json
    conn = get_db()
    c = conn.cursor()
    existing = c.execute(
        'SELECT id FROM user_data WHERE user_id = ? AND section = ?',
        (user_id, section)
    ).fetchone()

    payload = json.dumps(data, ensure_ascii=False)
    if existing:
        c.execute(
            'UPDATE user_data SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            (payload, existing['id'])
        )
    else:
        c.execute(
            'INSERT INTO user_data (user_id, section, data) VALUES (?, ?, ?)',
            (user_id, section, payload)
        )
    conn.commit()
    conn.close()
