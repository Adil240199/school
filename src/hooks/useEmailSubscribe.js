import { useState } from "react";

export const useEmailSubscribe = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setIsValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      alert("🎉 Спасибо за подписку!");
      setEmail("");
    } else {
      setIsValid(false);
    }
  };

  return {
    email,
    isValid,
    handleChange,
    handleSubmit,
  };
};
