import { ModalParams, ModalType } from "@/types/modal.types";

export function generateModalPath<T extends ModalType>(
    currentParams: URLSearchParams,
    modal: T,
    params?: ModalParams<T>
  ): string {
    const updatedParams = new URLSearchParams(currentParams); // clone to avoid mutation
  
    updatedParams.set("modal", modal);
  
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value != null) {
          updatedParams.set(key, String(value));
        }
      });
    }
  
    return `?${updatedParams.toString()}`;
  }

