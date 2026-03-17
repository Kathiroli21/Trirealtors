const rawBase = import.meta.env.VITE_BACKEND_URL;
const base = typeof rawBase === 'string' ? rawBase.trim().replace(/\/+$/, '') : '';

export const getApiUrl = (path) => {
  const cleanedPath = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${cleanedPath}` : cleanedPath;
};
