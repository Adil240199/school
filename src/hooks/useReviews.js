import { useState, useEffect, useCallback } from "react";

const API_URL_V = process.env.REACT_APP_API_URL;
const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/reviews"
    : `${API_URL_V}/api/reviews`;

export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
