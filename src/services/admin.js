import api from "../api";

/** Безопасный запрос */
async function safeRequest(promise) {
  try {
    const { data } = await promise;
    return { ok: true, data };
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.message ||
      "Server error. Please try again.";

    console.error("API error:", msg);

    return { ok: false, error: msg };
  }
}

export async function fetchCourses() {
  const res = await safeRequest(api.get("/courses"));
  if (!res.ok) return [];

  const coursesArray = Array.isArray(res.data) ? res.data : res.data.courses;

  return (coursesArray || []).map((c) => ({
    _id: c._id,
    title: c.title,
    level: c.level,
  }));
}

// === УРОКИ (АДМИНСКИЕ) ===
export async function fetchAdminLessons(courseId) {
  if (!courseId) return [];

  const res = await safeRequest(api.get(`/admin/courses/${courseId}/lessons`));
  if (!res.ok) return [];

  return res.data;
}

// === ЗАГРУЗКА ВИДЕО УРОКА ===
export async function uploadLessonVideo(formData) {
  return safeRequest(
    api.post("/lessons/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
}

// === СОЗДАНИЕ ===
export async function createLesson(payload) {
  return safeRequest(api.post("/admin/lessons", payload));
}

// === ОБНОВЛЕНИЕ ===
export async function updateLesson(id, payload) {
  return safeRequest(api.put(`/admin/lessons/${id}`, payload));
}

// === УДАЛЕНИЕ ===
export async function deleteLesson(id) {
  return safeRequest(api.delete(`/admin/lessons/${id}`));
}

// === ПОЛЬЗОВАТЕЛИ ===
export async function fetchUsers() {
  const res = await safeRequest(api.get("/admin/users"));
  if (!res.ok) return [];

  return res.data;
}

// === ВЫДАТЬ ДОСТУП К КУРСУ ===
export async function grantCourseAccess(userId, courseId) {
  return safeRequest(api.post("/admin/grant-course", { userId, courseId }));
}
