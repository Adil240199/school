import { useState, useEffect, useCallback } from "react";

// Автоматический выбор API в зависимости от среды
const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/reviews"
    : "https://school-backend-c6gi.onrender.com/api/reviews";

export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка всех отзывов
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then(setReviews)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Добавление нового отзыва
  const addReview = useCallback(async (newReview) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      const saved = await res.json();
      setReviews((prev) => [...prev, saved]);
    } catch (e) {
      throw e;
    }
  }, []);

  return { reviews, loading, error, addReview };
}
