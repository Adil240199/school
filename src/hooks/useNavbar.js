import { useState} from "react";

export const useNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);



  const handleClick = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return { isOpen, handleClick, closeMenu };
};