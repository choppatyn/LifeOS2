const API_URL =
  (import.meta.env.VITE_API_URL as string) ||
  'https://lifeos-backend-production-d7a2.up.railway.app';

/**
 * Всегда берём свежий initData из Telegram (без кэша).
 * Если Telegram ещё не загрузился — ждём до 3 секунд.
 */
function getInitData(): string {
  const tg = (window as any)?.Telegram?.WebApp;
  return tg?.initData || '';
}

/**
 * Ждём, пока Telegram WebApp отдаст initData.
 * Нужно потому, что скрипт telegram-web-app.js может грузиться с задержкой.
 */
async function waitForInitData(timeoutMs = 3000): Promise<string> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const data = getInitData();
    if (data && data.length > 0) return data;
    await new Promise((r) => setTimeout(r, 100));
  }
  return getInitData();
}

/**
 * Универсальный запрос к API.
 */
async function request(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: any
) {
  const initData = await waitForInitData();

  // Для отладки: покажет в консоли, что уходит
  console.log('[API]', method, path, 'initData length:', initData.length);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Telegram-Init-Data': initData,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body !== undefined) {
    options.body = JSON.stringify({ initData, ...body });
  }

  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`API ${method} ${path} → ${res.status} ${errorText}`);
  }
  return res.json();
}

export const api = {
  auth: () => request('POST', '/api/auth', {}),
  me: () => request('POST', '/api/me', {}),
  getData: (section: string) => request('POST', `/api/data/${section}`, {}),
  saveData: (section: string, data: any) =>
    request('PUT', `/api/data/${section}`, { data }),
  health: () => request('GET', '/api/health'),
};

export { getInitData, waitForInitData };
