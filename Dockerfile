FROM node:20-alpine

WORKDIR /app

# Копируем манифесты и ставим зависимости
COPY package*.json ./
RUN npm install

# Копируем весь исходник
COPY . .

# Собираем Vite-проект
RUN npm run build

# Устанавливаем serve для раздачи статики
RUN npm install -g serve

ENV PORT=8080
EXPOSE 8080

# Раздаём собранный dist
CMD ["sh", "-c", "serve -s dist -l $PORT"]
