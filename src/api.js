import axios from "axios";

// Базовый URL (локальный или из окружения)
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api"
    : `${process.env.REACT_APP_API_URL}/api`;

const api = axios.create({
  baseURL,
  withCredentials: true, // нужно для refresh cookie
  timeout: 15000,
});

// === Вспомогательная функция для подключения токена ===
let accessToken = null;
let refreshFunc = null;

export const setApiAuth = ({ getAccessToken, refreshToken }) => {
  refreshFunc = refreshToken;
  getAccessToken().then((token) => (accessToken = token));

  // перехват запросов
  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // перехват ответов
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const original = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !original._retry &&
        refreshFunc
      ) {
        original._retry = true;
        const newToken = await refreshFunc();
        if (newToken) {
          accessToken = newToken;
          original.headers.Authorization = `Bearer ${newToken}`;
          return api(original);
        }
      }
      return Promise.reject(error);
    }
  );
};

// функция обновления токена при логине/логауте
export const updateAccessToken = (token) => {
  accessToken = token;
};

export default api;
