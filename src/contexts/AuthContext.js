import React, { createContext, useState, useEffect, useRef } from "react";
import api, { setApiAuth, updateAccessToken } from "../api";
import axios from "axios";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // оставляем user в локальном хранилище для UX (чтобы имя/аватар показывались быстрее)
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  // access token хранится только в памяти (ref), чтобы уменьшить риск XSS-кражи
  const accessTokenRef = useRef(null);

  // Чтобы не делать параллельных refresh-запросов — сохраняем текущий промис
  const refreshingPromiseRef = useRef(null);

  // Функция refresh: вызывает POST /auth/refresh и обновляет accessTokenRef + user
  const refresh = async () => {
    // если уже обновляется — дождёмся результата
    if (refreshingPromiseRef.current) {
      return refreshingPromiseRef.current;
    }

    const p = (async () => {
      try {
        const { data } = await api.post("/auth/refresh"); // cookie отправится автоматически (withCredentials)
        if (data?.accessToken) {
          accessTokenRef.current = data.accessToken;
        } else {
          accessTokenRef.current = null;
        }
        if (data?.user) {
          setUser(data.user);
          try {
            localStorage.setItem("user", JSON.stringify(data.user));
          } catch {}
        }
        return data?.accessToken || null;
      } catch (err) {
        // refresh не прошёл — выходим из сессии
        accessTokenRef.current = null;
        setUser(null);
        try {
          localStorage.removeItem("user");
        } catch {}
        return null;
      } finally {
        refreshingPromiseRef.current = null;
      }
    })();

    refreshingPromiseRef.current = p;
    return p;
  };

  // Инициализация: при старте пробуем получить accessToken через refresh
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setApiAuth({
          getAccessToken: async () => accessTokenRef.current,
          refreshToken: refresh,
        });

        const newAccess = await refresh();
        if (!newAccess) {
          setUser(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Настраиваем axios interceptors: добавляем Authorization, и при 401 — пытаемся refresh + повторить
  useEffect(() => {
    const reqInterceptor = api.interceptors.request.use((config) => {
      const token = accessTokenRef.current;
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const resInterceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config;
        // если нет ответа или нет статуса — пробрасываем
        if (!error.response) return Promise.reject(error);

        // если 401 и мы ещё не пытались рефрешить этот запрос
        if (error.response.status === 401 && !original._retry) {
          original._retry = true;
          const newAccess = await refresh();
          if (newAccess) {
            original.headers = original.headers || {};
            original.headers.Authorization = `Bearer ${newAccess}`;
            return api(original); // повторяем запрос
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqInterceptor);
      api.interceptors.response.eject(resInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Регистрация: бэк ожидает name,email,password и возвращает accessToken + ставит refresh cookie
  const register = async ({ name, email, password }) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      // если бэк вернул accessToken и user — сохраняем в память/локал
      if (data?.accessToken) {
        accessTokenRef.current = data.accessToken;
      }
      if (data?.user) {
        setUser(data.user);
        try {
          localStorage.setItem("user", JSON.stringify(data.user));
        } catch {}
      }
      return data;
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      throw err;
    }
  };

  // Логин: бэк ставит httpOnly refresh cookie и возвращает accessToken + user
  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      // Поддерживаем совместимость: либо accessToken, либо token (старый)
      const token = data?.accessToken || data?.token || null;
      accessTokenRef.current = token;
      updateAccessToken(token);
      if (data?.user) {
        setUser(data.user);
        try {
          localStorage.setItem("user", JSON.stringify(data.user));
        } catch {}
      }
      return data;
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  // Logout: посылаем на бэк запрос, бэк удалит refresh cookie и мы очистим память
  const logout = async () => {
    try {
      await api.post("/auth/logout"); // бэк должен clearCookie('refreshToken')
    } catch (err) {
      // даже если запрос упал — всё равно чистим на фронте
      console.warn("Logout request failed:", err.response?.data || err.message);
    } finally {
      accessTokenRef.current = null;
      setUser(null);
      try {
        localStorage.removeItem("user");
      } catch {}
      // редиректим на главную
      window.location.replace("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}
