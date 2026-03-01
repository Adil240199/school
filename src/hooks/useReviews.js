import { useState, useEffect, useCallback } from "react";
import api from "../api"

export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/reviews")
      .then((response) => {
        setReviews(response.data)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const addReview = useCallback(async (newReview) => {
    try {
      const response = await api.post("/reviews", newReview);
      const saved = response.data;
      setReviews((prev) => [...prev, saved]);
      return saved;
    } catch (e) {
      throw e;
    }
  }, []);

  return { reviews, loading, error, addReview };
}
