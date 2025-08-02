import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const API_URL_V = process.env.REACT_APP_API_URL;
const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/courses"
    : `${API_URL_V}/api/courses`;

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log("API_URL", API_URL);

    fetch(API_URL, {
      headers: { "Accept-Language": i18n.language },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [i18n.language]);

  return { courses, loading };
};
