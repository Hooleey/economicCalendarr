## economicCalendarr

## Публикация в интернет (работает всегда)

Проект состоит из:
- `frontend/`: Vite + React
- `backend/`: FastAPI (Uvicorn)

### 1) Деплой backend на Render (бесплатно)

1. Создайте аккаунт на Render.
2. Создайте новый сервис **Web Service** из репозитория (Render умеет читать `render.yaml`).
3. После деплоя откройте `https://<your-backend>.onrender.com/health` — должно вернуть `{"status":"ok"}`.

Важно про CORS:
- Переменная `FRONTEND_ORIGINS` должна содержать домен фронтенда (после деплоя на Vercel), например:
  - `https://my-site.vercel.app`
- Для Vercel preview-доменов можно оставить `FRONTEND_ORIGIN_REGEX=^https://.*\.vercel\.app$`

### 2) Деплой frontend на Vercel (бесплатно)

1. Создайте аккаунт на Vercel.
2. Импортируйте репозиторий и выберите проект `frontend/`.
3. В настройках проекта Vercel добавьте переменную окружения:
   - `VITE_API_BASE` = `https://<your-backend>.onrender.com`
4. Дождитесь деплоя и откройте ваш публичный URL Vercel.

### 3) Обязательный шаг: связать домены (CORS)

Когда у вас появится URL фронтенда на Vercel:
1. Зайдите в Render → настройки backend → Environment.
2. Установите:
   - `FRONTEND_ORIGINS` = `https://<your-frontend>.vercel.app`
3. Перезапустите сервис.

