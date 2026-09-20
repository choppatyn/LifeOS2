# LifeOS2 — операционная система личной жизни

Telegram Mini App + React-фронтенд. Реализует раздел «Профиль» с подразделами, а также «Характеристики», «Навыки», «Социум», «Ещё».

---

## 🧱 Структура репозитория

```
LifeOS2/
├── .gitignore
├── README.md
└── frontend/                ← актуальный проект (Vite + React + TS + Tailwind)
    ├── index.html           ← точка входа Vite
    ├── package.json         ← зависимости и скрипты
    ├── vite.config.ts       ← конфиг Vite
    ├── tailwind.config.js   ← тема (цвета #0a0808, #c9a84c, шрифты)
    ├── postcss.config.js
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── src/
        ├── App.tsx          ← маршрутизация (react-router-dom)
        ├── main.tsx         ← точка входа React
        ├── index.css        ← глобальные стили: .card, .btn-gold, .input, .info-row
        ├── components/
        │   └── layout/BottomNav.tsx    ← нижняя навигация
        ├── layouts/AppLayout.tsx       ← общая обёртка страниц
        ├── lib/utils.ts                ← cn(), formatDate(), calcAge()
        └── pages/
            └── Profile/                ← раздел «Профиль»
                ├── index.tsx           ← экран профиля (просмотр / редактирование)
                ├── Subsections.tsx     ← список подразделов
                ├── components/
                │   ├── ProfileHeader.tsx
                │   ├── ProfileInfoForm.tsx
                │   └── ProfileInfoList.tsx
                ├── hooks/
                │   └── useProfile.ts
                ├── Achievements/       ← Достижения (CRUD)
                │   ├── index.tsx
                │   ├── components/
                │   │   ├── AchievementCard.tsx
                │   │   └── AchievementForm.tsx
                │   └── hooks/
                │       └── useAchievements.ts
                ├── Career/
                ├── Documents/
                ├── Habits/
                ├── Identity/
                ├── LifePath/
                ├── Relationships/
                └── Travels/
```

---

## 🧭 Навигация в приложении

- Нижнее меню: **Профиль · Характеристики · Навыки · Социум · Ещё**
- Раздел **Профиль**:
  - Экран 1 — просмотр (данные + «Редактировать профиль» + «Перейти в подразделы»)
  - Экран 2 — форма редактирования
  - Экран 3 — список подразделов
  - Экран 4 — конкретный подраздел (Достижения, Карьера, Путешествия и т.д.)
- **«Ещё»**: Инвентарь · Цели · Активы · Баланс · Дневник · Настройки

---

## 🎨 Дизайн

- Тёмный фон: `#0a0808`
- Карточки: градиент `#1a1515 → #141010`, граница `#2a2323`
- Золотой акцент: `#c9a84c` (кнопки, заголовки, прогресс-бары)
- Шрифт: **Inter**
- Скругления: 12–40px
- Полностью mobile-first (320–480px)

Основные CSS-классы (`src/index.css`):

| Класс | Назначение |
|-------|------------|
| `.container` | Обёртка 480px по центру |
| `.card` | Карточка с градиентом и золотой рамкой при hover |
| `.btn-gold` | Золотая кнопка |
| `.btn-outline-gold` | Кнопка-обводка |
| `.input` | Тёмный input/textarea с золотой рамкой при фокусе |
| `.progress-bar` + `.progress-fill` | Прогресс-бар |
| `.avatar`, `.avatar-lg/md/sm` | Аватары |
| `.level-badge` | Бейдж уровня |
| `.info-row`, `.info-label`, `.info-value` | Строки «label → value» |
| `.bottom-nav`, `.nav-item` | Нижняя навигация |

---

## ⚙️ Локальный запуск

```bash
cd frontend
npm install
npm run dev
```

Откроется на `http://localhost:5173`.

---

## 🚀 Деплой на Railway

Настройки сервиса:

| Поле | Значение |
|------|----------|
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npx serve -s dist -l 8080` |
| **Port** (Networking) | `8080` |

После изменений:

1. Закоммить в `frontend/src/...`
2. Railway увидит изменение и пересоберёт `dist/`
3. Хэш `index-XXXXXXXX.js` в HTML обновится → новые правки видны

---

## 🔐 Переменные окружения

В `frontend/.env` (или в Railway → Variables):

```
VITE_API_URL=https://lifeosfatherbot.up.railway.app/api
```

Если переменная не задана — фронт использует `/api` (проксируется на бэкенд).

---

## 📌 Известные проблемы / TODO

- [ ] Убедиться, что Railway собирает именно `frontend/` (Root Directory)
- [ ] `Achievements` работает через `localStorage` + попытка `PUT /api/profile/achievements`
- [ ] Разделы Career, Documents, Habits, Identity, LifePath, Relationships, Travels — пока с тестовыми данными
- [ ] Авторизация через Telegram WebApp (`initData`) — TODO для бэкенда
- [ ] Остальные разделы (Skills, Society, Inventory, Goals, Assets, Balance, Journal, Settings) — заглушки

---

## 🧾 История

- v0.1 — первый прототип (Python + HTML)
- v0.2 — переход на React + Vite + Tailwind (папка `frontend/`)
- v0.3 — Профиль с подразделами + CRUD Достижения (фильтры, «+», форма, удаление)
- v0.4 — обновлённый README как точка сохранения

---

## 👤 Автор

Кирилл Смирнов · [github.com/choppatyn](https://github.com/choppatyn)
