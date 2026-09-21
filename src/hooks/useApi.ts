const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Получить initData из Telegram WebApp.
 * Кэшируется, чтобы не дёргать window на каждый запрос.
 */
let cachedInitData: string | null = null;

function getInitData(): string {
  if (cachedInitData !== null) return cachedInitData;
  const tg = (window as any)?.Telegram?.WebApp;
  cachedInitData = tg?.initData || '';
  return cachedInitData;
}

/**
 * Универсальный запрос к API.
 * initData отправляется в теле POST/PUT или в заголовке для GET.
 */
async function request(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: any
) {
  const initData = getInitData();

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
  // --- AUTH ---
  auth: () => request('POST', '/api/auth', {}),
  me: () => request('POST', '/api/me', {}),

  // --- DATA (универсальные) ---
  getData: (section: string) => request('POST', `/api/data/${section}`, {}),
  saveData: (section: string, data: any) =>
    request('PUT', `/api/data/${section}`, { data }),

  // --- HEALTH ---
  health: () => request('GET', '/api/health'),
};
