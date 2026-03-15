import React, { useEffect, useState, useContext } from "react";
import styles from "./adminLesson.module.css";
import {
  fetchCourses,
  fetchAdminLessons,
  deleteLesson,
  fetchUsers,
  grantCourseAccess,
  uploadLessonVideo,
} from "../../services/admin";
import { AuthContext } from "../../contexts/AuthContext";

export default function AdminLesson() {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [users, setUsers] = useState([]);

  const [videoFile, setVideoFile] = useState(null);

  const [form, setForm] = useState({
    courseId: "",
    title: "",
  });

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");


  /* ---------------- LOAD INITIAL DATA ---------------- */

  useEffect(() => {
    if (authLoading) return;

  // Если авторизация прошла, но юзера нет (не админ/не залогинен)
  if (!user) {
    setLoading(false); 
    return;
  }

    let mounted = true;

    async function loadData() {
      try {
        const [coursesData, usersData] = await Promise.all([
          fetchCourses(),
          fetchUsers(),
        ]);

        if (!mounted) return;

        setCourses(coursesData);
        setUsers(usersData);

        if (coursesData.length) {
          setForm((f) => ({
            ...f,
            courseId: coursesData[0]._id,
          }));
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load admin data");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [user, authLoading]);

  /* ---------------- LOAD LESSONS ---------------- */

  useEffect(() => {
    if (!form.courseId) return;

    let mounted = true;

    async function loadLessons() {
      const data = await fetchAdminLessons(form.courseId);
      if (!mounted) return;

      setLessons(data);
    }

    loadLessons();

    return () => {
      mounted = false;
    };
  }, [form.courseId]);

  /* ---------------- INPUT HANDLER ---------------- */

  const handle = (e) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  /* ---------------- RESET FORM ---------------- */

  const reset = () => {
    setForm({
      courseId: courses[0]?._id || "",
      title: "",
    });

    setVideoFile(null);
    setEditingId(null);
    setError("");
  };

  /* ---------------- CREATE LESSON ---------------- */

  const submit = async () => {
    if (!videoFile) return setError("Выберите видео");
    if (!form.title.trim()) return setError("Введите заголовок");

    setSaving(true);
    setError("");

    try {
      const data = new FormData();

      data.append("title", form.title);
      data.append("courseId", form.courseId);
      data.append("video", videoFile);

      const result = await uploadLessonVideo(data);

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setLessons((prev) => [...prev, result.data]);

      reset();
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- EDIT LESSON ---------------- */

  const edit = (lesson) => {
    setForm({
      courseId: form.courseId,
      title: lesson.title || "",
    });

    setEditingId(lesson._id);
  };

  /* ---------------- DELETE LESSON ---------------- */

  const remove = async (id) => {
    const result = await deleteLesson(id);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setLessons((prev) => prev.filter((l) => l._id !== id));

    if (editingId === id) reset();
  };

  /* ---------------- GRANT COURSE ---------------- */

  const grantCourse = async (userId, courseId) => {
    if (!courseId) return;

    const result = await grantCourseAccess(userId, courseId);

    if (!result.ok) {
      alert(result.error);
      return;
    }

    alert("Access granted");
  };

  /* ---------------- PAGE LOADING ---------------- */

  if (authLoading) {
    return <div className={styles.wrap}>Auth loading...</div>;
  }
  
  if (loading) {
    return <div className={styles.wrap}>Loading...</div>;
  }

  /* ---------------- UI ---------------- */

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
          Видео
          <input
            type="file"
            accept="video/mp4"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </label>

        <div className={styles.actions}>
          <button onClick={submit} disabled={saving}>
            Create
          </button>

          <button disabled={!editingId || saving}>Update</button>

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

        {users.map((u) => (
          <div key={u._id} className={styles.userRow}>
            <span>{u.email}</span>

            <select onChange={(e) => grantCourse(u._id, e.target.value)}>
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