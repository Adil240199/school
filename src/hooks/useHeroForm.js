import { useState } from "react";

export const useHeroForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({ name: "", phone: "" });

  const validate = {
    name: (value) =>
      /^[a-zA-Zа-яА-Я]*$/.test(value) ? "" : "Введите только буквы",
    phone: (value) => (/^\d*$/.test(value) ? "" : "Введите только цифры"),
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validate[field](value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = formData;
    if (!name || !phone) {
      alert("Заполните все поля");
      return;
    }
    const msg = `Имя: ${name}\nНомер: ${phone}`;
    const link = `https://api.whatsapp.com/send?phone=36705854018&text=${encodeURIComponent(
      msg
    )}`;
    window.open(link, "_blank");
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};
