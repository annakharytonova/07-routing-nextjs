"use client";

import css from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface ModalParam {
  children: React.ReactNode;
  onClose?: () => void;
}

function Modal({ children, onClose }: ModalParam) {
  const router = useRouter();
  const closeModal = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  }, [onClose, router]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.getElementById("modal-root")!,
  );
}

export default Modal;
