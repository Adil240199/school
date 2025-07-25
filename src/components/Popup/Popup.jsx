import React, { useEffect, useRef } from "react";
import styles from "./Popup.module.css";

export default function Popup({ title, children, onClose }) {
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);

  useEffect(() => {
    // Сохраняем элемент, который был в фокусе до открытия
    lastFocusedElement.current = document.activeElement;

    // Перемещаем фокус в модалку
    modalRef.current?.focus();

    // Запрещаем скролл страницы при открытой модалке
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Обработчик клавиатуры
    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab") {
        // Цикличный таб внутри модалки
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    // Возвращаем всё обратно при закрытии
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
      // Возвращаем фокус на последний элемент
      lastFocusedElement.current?.focus();
    };
  }, [onClose]);

  // Остановить всплытие клика по модалке (чтобы не закрывалась при клике внутри)
  const onModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="overlay"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-content"
        tabIndex={-1}
        ref={modalRef}
        onClick={onModalClick}
      >
        <h3 id="modal-title" className={styles.title}>{title}</h3>
        <div id="modal-content" className={styles.body}>
          {children}
        </div>
        <button
          className={styles.closeBtn}
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </>
  );
}
