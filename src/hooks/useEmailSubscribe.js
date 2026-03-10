import { useState } from "react";

export const useEmailSubscribe = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setIsValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email)) {
      setSuccess(true);
      setEmail("");

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } else {
      setIsValid(false);
    }
  };

  return {
    email,
    isValid,
    success,
    handleChange,
    handleSubmit,
  };
};