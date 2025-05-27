"use client";
import { memo, useCallback, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  btnStyle?: string;
  btnText: string;
  content: React.ReactNode;
  modalStyle?: string;
  onClose?: () => void;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnOutsideClick?: boolean;
  icon?: React.ReactNode;
  btnId?: string;
  title?: string;
}

const Modal = memo(
  ({
    btnStyle,
    btnText,
    content,
    modalStyle,
    onClose,
    isOpen: isOpenProp,
    onOpenChange,
    closeOnOutsideClick = true,
    icon,
    btnId,
    title,
  }: ModalProps) => {
    const [isOpenState, setIsOpenState] = useState(false);
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;
    // Handle mounting for portal
    useEffect(() => {
      setMounted(true);
    }, []);

    const open = useCallback(() => {
      previousActiveElement.current = document.activeElement as HTMLElement;

      if (isOpenProp === undefined) {
        setIsOpenState(true);
      }
      onOpenChange?.(true);
    }, [isOpenProp, onOpenChange]);

    const close = useCallback(() => {
      if (isOpenProp === undefined) {
        setIsOpenState(false);
      }
      onClose?.();
      onOpenChange?.(false);

      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }, [isOpenProp, onClose, onOpenChange]);

    // Handle outside click
    const handleOverlayClick = useCallback(
      (event: React.MouseEvent) => {
        if (closeOnOutsideClick && event.target === event.currentTarget) {
          close();
        }
      },
      [closeOnOutsideClick, close]
    );

    // Focus management
    useEffect(() => {
      if (isOpen && modalRef.current) {
        modalRef.current.focus();
      }
    }, [isOpen]);

    const modalContent = isOpen ? (
      <div
        className="fixed inset-0 z-40 focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto" onClick={handleOverlayClick}>
          <div className="h-screen w-screen bg-black/50">
            <div className="flex min-h-full items-center justify-center p-4">
              <div
                ref={modalRef}
                tabIndex={-1}
                className={
                  modalStyle ||
                  `w-full max-w-md transform rounded-xl bg-white/5 p-6 backdrop-blur-2xl transition-all duration-300 ease-out ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`
                }
                style={{
                  animation: isOpen ? "modalEnter 300ms ease-out" : "modalExit 300ms ease-out",
                }}
              >
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;

    return (
      <>
        <button
          id={btnId}
          title={title}
          onClick={open}
          className={
            btnStyle ||
            "rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-1 focus:outline-white focus:outline-none"
          }
        >
          {icon}
          {btnText}
        </button>

        {mounted && createPortal(modalContent, document.body)}
      </>
    );
  }
);

Modal.displayName = "Modal";
export default Modal;
