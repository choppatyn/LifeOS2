# LifeOS — операционная система личной жизни

Telegram Mini App на React + Vite + TypeScript + Tailwind. Тёмный RPG-дизайн, мобильная навигация, разделы «Профиль» с подразделами, «Характеристики», «Навыки», «Социум», «Ещё».

---

## 🧱 Структура репозитория

```
LifeOS2/
├── .gitignore
├── .node-version                  ← версия Node.js для Railway
├── Dockerfile                     ← сборка и запуск фронтенда
├── README.md
├── index.html                     ← точка входа Vite
├── package.json                   ← зависимости и скрипты
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx                   ← точка входа React
    ├── App.tsx                    ← маршрутизация (react-router-dom)
    ├── index.css                  ← глобальные стили + утилиты
    ├── components/
    │   ├── layout/
    │   │   └── BottomNav.tsx      ← нижняя навигация
    │   └── ui/                    ← ПЕРЕИСПОЛЬЗУЕМЫЕ КОМПОНЕНТЫ
    │       ├── Card.tsx
    │       ├── Button.tsx
    │       ├── Avatar.tsx
    │       ├── ProgressBar.tsx
    │       ├── ChevronIcon.tsx    ← стрелка › (везде одна)
    │       ├── IconCircle.tsx     ← золотистая круглая подложка
    │       └── ListRow.tsx        ← строка списка: иконка + текст + стрелка
    ├── layouts/
    │   └── AppLayout.tsx          ← обёртка страниц + нижняя навигация
    ├── lib/
    │   └── utils.ts               ← cn(), formatDate(), calcAge()
    └── pages/
        ├── Profile/
        │   ├── index.tsx
        │   ├── Subsections.tsx
        │   ├── components/
        │   │   ├── ProfileHeader.tsx
        │   │   ├── ProfileInfoForm.tsx
        │   │   └── ProfileInfoList.tsx
        │   ├── hooks/
        │   │   └── useProfile.ts
        │   ├── Achievements/                ← РАБОЧИЙ CRUD
        │   │   ├── index.tsx
        │   │   ├── components/
        │   │   │   ├── AchievementCard.tsx
        │   │   │   └── AchievementForm.tsx
        │   │   └── hooks/
        │   │       └── useAchievements.ts
        │   ├── Career/
        │   ├── Documents/
        │   ├── Habits/
        │   ├── Identity/
        │   ├── LifePath/
        │   ├── Relationships/
        │   └── Travels/
        ├── Characteristics/
        ├── Skills/
        ├── Society/
        ├── More/
        ├── Inventory/
        ├── Goals/
        ├── Assets/
        ├── Balance/
        ├── Journal/
        └── Settings/
```

---

## 🧭 Навигация

Нижнее меню: **Профиль · Характеристики · Навыки · Социум · Ещё**.

Раздел **Профиль**:

| Экран | URL | Что показывает |
|-------|-----|----------------|
| 1. Профиль | `/profile` | Данные + «Редактировать» + «Перейти в подразделы» |
| 2. Редактирование | `/profile` (состояние) | Форма со всеми полями |
| 3. Подразделы | `/profile/subsections` | Список из 8 подразделов |
| 4. Достижения | `/profile/achievements` | CRUD-список достижений |
| 4. Карьера | `/profile/career` | Карьера |
| 4. Документы | `/profile/documents` | Документы |
| 4. Привычки | `/profile/habits` | Привычки |
| 4. Идентичность | `/profile/identity` | Идентичность |
| 4. Жизненный путь | `/profile/lifepath` | Timeline событий |
| 4. Отношения | `/profile/relationships` | Близкие люди |
| 4. Путешествия | `/profile/travels` | Поездки |

**«Ещё»**: Инвентарь · Цели · Активы · Баланс · Дневник · Настройки.

---

## 🎨 Дизайн

- Фон: `#0a0808`
- Карточки: градиент `#1a1515 → #141010`, граница `#2a2323`
- Золотой акцент: `#c9a84c`
- Серый текст: `#7a6e62` (`.text-muted`), стрелки: `#4a3f36`
- Шрифт: **Inter**
- Mobile-first: 320–480px

### CSS-классы (`src/index.css`)

| Класс | Назначение |
|-------|------------|
| `.container` | Обёртка 480px |
| `.card` | Карточка с градиентом и золотой рамкой при hover |
| `.btn-gold` / `.btn-outline-gold` | Кнопки |
| `.input` | Поле формы (тёмное, золотая рамка при фокусе) |
| `.progress-bar` / `.progress-fill` | Прогресс-бар |
| `.avatar` + `.avatar-sm/md/lg` | Аватары |
| `.level-badge` | Бейдж уровня |
| `.info-row` / `.info-label` / `.info-value` | Строки «label → value» |
| `.bottom-nav` / `.nav-item` | Нижняя навигация |

### UI-компоненты (`src/components/ui/`)

Все списки и строки используют **общие компоненты**, чтобы менять элемент в одном месте:

| Компонент | Роль |
|-----------|------|
| `ChevronIcon` | Единственная стрелка `›` во всём приложении |
| `IconCircle` | Золотистая круглая подложка под иконку |
| `ListRow` | Строка списка: `IconCircle` + заголовок + подсказка + `ChevronIcon` |
| `Card` / `Button` / `Avatar` / `ProgressBar` | Базовые элементы |

**Пример использования `ListRow`:**

```tsx
<ListRow
  icon="🏆"
  title="Достижения"
  subtitle="Нажмите для перехода"
  path="/profile/achievements"
/>
```

**Если завтра нужно поменять стрелку** — правишь **только `ChevronIcon.tsx`**, и она меняется во всех списках.

---

## 🔄 CRUD: Достижения (эталон для остальных разделов)

Раздел `/profile/achievements` — рабочий пример CRUD с хранением:

- Данные лежат в `localStorage` под ключом `lifeos.achievements`
- При изменении уходит `PUT /api/profile/achievements` (если бэкенд доступен)
- Поля: `title`, `description`, `date`, `category`
- Категории: Личные, Карьера, Финансы, Здоровье, Путешествия
- Плавающая кнопка «+» открывает форму
- Клик по достижению открывает редактирование

**Структура папки** (повторяется для каждого CRUD-раздела):

```
<Section>/
├── index.tsx             ← список + фильтры + «+»
├── components/
│   ├── <Item>Card.tsx    ← карточка одного элемента
│   └── <Item>Form.tsx    ← форма создания/редактирования
└── hooks/
    └── use<Items>.ts     ← загрузка/сохранение/статистика
```

---

## ⚙️ Локальный запуск

```bash
npm install
npm run dev
```

Открывается на `http://localhost:5173`.

---

## 🚀 Деплой на Railway

Сервис собирается через **Dockerfile** (Railpack не поддерживает наши зависимости).

**Настройки Railway:**

| Поле | Значение |
|------|----------|
| Builder | **Dockerfile** |
| Root Directory | (пусто) |
| Build Command | (не используется) |
| Start Command | (не используется) |

**Dockerfile** уже в корне. Он:

1. Ставит Node.js 20
2. `npm install`
3. `npm run build` → создаёт `dist/`
4. Устанавливает `serve`
5. Раздаёт `dist/` на порту `$PORT`

---

## 🔐 Переменные окружения

В `frontend/.env` (или в Railway → Variables):

```
VITE_API_URL=https://lifeosfatherbot.up.railway.app/api
```

Если не задано — используется `/api`.

---

## 📌 TODO

- [x] Профиль + подразделы
- [x] CRUD Достижения (эталон)
- [x] Общие UI-компоненты (`ListRow`, `ChevronIcon`, `IconCircle`)
- [ ] Перенести остальные разделы (Career, Documents, Habits, Identity, LifePath, Relationships, Travels) на `ListRow` и CRUD-структуру
- [ ] Авторизация через Telegram WebApp (`initData`) на бэкенде
- [ ] Разделы Skills, Society, Inventory, Goals, Assets, Balance, Journal, Settings — наполнить содержимым

---

## 🧾 История

- v0.1 — Python + HTML прототип
- v0.2 — переход на React + Vite + Tailwind
- v0.3 — Профиль + подразделы, CRUD Достижения
- v0.4 — общие UI-компоненты (`ListRow`, `ChevronIcon`, `IconCircle`)
- v0.5 — единая стрелка `›` во всём приложении

---

## 👤 Автор

Кирилл Смирнов · [github.com/choppatyn](https://github.com/choppatyn)
