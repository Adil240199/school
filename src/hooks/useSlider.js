import { useEffect, useRef, useState } from "react";

export const useSlider = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const position = useRef({ startX: 0, scrollLeft: 0 });

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    position.current = {
      startX: e.pageX,
      scrollLeft: sliderRef.current.scrollLeft,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    requestAnimationFrame(() => {
      const deltaX = e.pageX - position.current.startX;
      sliderRef.current.scrollLeft = position.current.scrollLeft - deltaX;
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleDotClick = (index) => {
    if (isDragging || !sliderRef.current) return;
    const slideWidth = sliderRef.current.children[0]?.clientWidth || 0;
    const targetScrollLeft = index * slideWidth;
    sliderRef.current.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const slideWidth = slider.children[0]?.clientWidth || 0;
      const newIndex = Math.round(slider.scrollLeft / slideWidth);
      setCurrentIndex(newIndex);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    sliderRef,
    currentIndex,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUpOrLeave,
    handleDotClick,
  };
};
