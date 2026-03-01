import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../api";

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    api
      .get("/courses", {
        headers: { "Accept-Language": i18n.language },
      })
      .then((response) => {
        setCourses(response.data.courses || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [i18n.language]);

  return { courses, loading };
};
