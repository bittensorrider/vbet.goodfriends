"use client";

import { ModalParams, ModalType } from "@/types/modal.types";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export type ModalControls<T extends ModalType = ModalType> = {
  isOpen: boolean;
  onOpen: (params?: ModalParams<T>) => void;
  onClose: () => void;
  getParam: <K extends keyof ModalParams<T>>(
    key: K,
    fallback: ModalParams<T>[K]
  ) => ModalParams<T>[K];
  setParam: <K extends keyof ModalParams<T>>(key: K, value: ModalParams<T>[K]) => void;
  removeParam: <K extends keyof ModalParams<T>>(key: K) => void;
  closeWithParams: (keys?: (keyof ModalParams<T>)[]) => void;
};

export const useModal = <T extends ModalType>(modalType: T): ModalControls<T> => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Keep isOpen in sync with router query string
  useEffect(() => {
    const modalParam = searchParams.get("modal");
    setIsOpen(modalParam === modalType);
  }, [searchParams, modalType]);

  const onOpen = useCallback((params?: ModalParams<T>) => {
    const sp = new URLSearchParams(window.location.search);
    sp.set("modal", modalType);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value != null) sp.set(key, String(value));
      });
    }
    window.history.replaceState(null, "", `?${sp.toString()}`);
  }, [modalType]);
  
  const onClose = useCallback(() => {
    const sp = new URLSearchParams(window.location.search);
    sp.delete("modal");
    ["tab", "id"].forEach((key) => sp.delete(key));
    window.history.replaceState(null, "", `?${sp.toString()}`);
  }, []);

  const getParam = useCallback(<K extends keyof ModalParams<T>>(key: K, fallback: ModalParams<T>[K]) => {
    const param = searchParams.get(String(key));
    return param !== null ? param as ModalParams<T>[K] : fallback;
  }, [searchParams]);

  const setParam = useCallback(<K extends keyof ModalParams<T>>(key: K, value: ModalParams<T>[K]) => {
    const sp = new URLSearchParams(window.location.search);
    sp.set(String(key), String(value));
    window.history.replaceState(null, "", `?${sp.toString()}`);
  }, []);

  const removeParam = useCallback<<K extends keyof ModalParams<T>>(key: K) => void>((key) => {
    const sp = new URLSearchParams(window.location.search);
    sp.delete(String(key));
    window.history.replaceState(null, "", `?${sp.toString()}`);
  }, []);

  const closeWithParams = (keys: (keyof ModalParams<T>)[] = []) => {
    const sp = new URLSearchParams(window.location.search);
    sp.delete("modal");
    keys.forEach((key) => sp.delete(String(key)));
    window.history.replaceState(null, "", `?${sp.toString()}`);
  };


  return { isOpen, onOpen, onClose, getParam, setParam, removeParam, closeWithParams };
};