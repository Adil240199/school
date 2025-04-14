import { useState, useEffect } from "react";

export const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [isOpen]);

  const handleClick = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return { isOpen, handleClick, closeMenu };
};
