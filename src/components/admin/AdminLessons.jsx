import React, { useEffect, useState } from "react";
import styles from "./adminLesson.module.css";
import {
  fetchCourses,
  fetchAdminLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  fetchUsers,
  grantCourseAccess,
} from "../../services/admin";

export default function AdminLesson() {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    courseId: "",
    title: "",
    videoUrl: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ---------- load users ----------
  useEffect(() => {
    let mounted = true;

    (async () => {
      const us = await fetchUsers();
      if (!mounted) return;

      setUsers(us);
    })();

    return () => (mounted = false);
  }, []);

  // ---------- grant course ----------
  const grantCourse = async (userId, courseId) => {
    if (!courseId) return;

    const result = await grantCourseAccess(userId, courseId);

    if (!result.ok) {
      alert(result.error);
      return;
    }

    alert("Access granted");
  };

  // ---------- load courses ----------
  useEffect(() => {
    let mounted = true;

    (async () => {
      const cs = await fetchCourses();
      if (!mounted) return;

      setCourses(cs);
      setForm((f) => ({ ...f, courseId: cs[0]?._id || "" }));
      setLoading(false);
    })();

    return () => (mounted = false);
  }, []);

  // ---------- load lessons ----------
  useEffect(() => {
    let mounted = true;

    if (!form.courseId) {
      setLessons([]);
      return;
    }

    (async () => {
      const ls = await fetchAdminLessons(form.courseId);
      if (!mounted) return;

      setLessons(ls);
    })();

    return () => (mounted = false);
  }, [form.courseId]);

  // ---------- handle inputs ----------
  const handle = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  // ---------- reset form ----------
  const reset = () => {
    setForm({
      courseId: courses[0]?._id || "",
      title: "",
      videoUrl: "",
    });

    setEditingId(null);
    setError("");
  };

  // ---------- submit ----------
  const submit = async (mode) => {
    if (!form.title.trim()) return setError("Введите заголовок");
    if (!form.videoUrl.trim()) return setError("Введите ссылку на видео");

    setSaving(true);
    setError("");

    const payload = {
      courseId: form.courseId,
      title: form.title,
      videoUrl: form.videoUrl,
    };

    let result;

    if (mode === "create") {
      result = await createLesson(payload);
    } else {
      result = await updateLesson(editingId, payload);
    }

    if (!result.ok) {
      setError(result.error || "Ошибка сохранения");
      setSaving(false);
      return;
    }

    const lesson = result.data;

    if (mode === "create") {
      setLessons((l) => [...l, lesson]);
    } else {
      setLessons((l) => l.map((x) => (x._id === editingId ? lesson : x)));
    }

    reset();
    setSaving(false);
  };

  // ---------- edit ----------
  const edit = (l) => {
    setForm({
      courseId: form.courseId,
      title: l.title || "",
      videoUrl: l.videoUrl || "",
    });

    setEditingId(l._id);
  };

  // ---------- delete ----------
  const remove = async (id) => {
    const result = await deleteLesson(id);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setLessons((l) => l.filter((x) => x._id !== id));

    if (id === editingId) reset();
  };

  if (loading) return <div className={styles.wrap}>Загрузка…</div>;

  return (
    <div className={styles.wrap}>
      <h2 className={styles.h}>Admin — Lessons</h2>

      {error && <div className={styles.error}>{error}</div>}

      {/* FORM */}
      <div className={styles.form}>
        <label>
          Курс
          <select name="courseId" value={form.courseId} onChange={handle}>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Заголовок
          <input name="title" value={form.title} onChange={handle} />
        </label>

        <label>
          Ссылка на видео
          <input name="videoUrl" value={form.videoUrl} onChange={handle} />
        </label>

        <div className={styles.actions}>
          <button onClick={() => submit("create")} disabled={saving}>
            Create
          </button>

          <button
            onClick={() => submit("update")}
            disabled={!editingId || saving}
          >
            Update
          </button>

          <button onClick={reset} disabled={saving}>
            Clear
          </button>
        </div>
      </div>

      {/* LESSONS */}
      <div className={styles.list}>
        <h3>Lessons</h3>

        {lessons.map((l) => (
          <div key={l._id} className={styles.item}>
            <div>
              <strong>{l.title}</strong>
            </div>

            <div className={styles.itemActions}>
              <button onClick={() => edit(l)}>✏️</button>
              <button onClick={() => remove(l._id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      {/* USERS */}
      <div className={styles.users}>
        <h3>Users</h3>

        {users.map((user) => (
          <div key={user._id} className={styles.userRow}>
            <span>{user.email}</span>

            <select onChange={(e) => grantCourse(user._id, e.target.value)}>
              <option value="">Grant course</option>

              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
