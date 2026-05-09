import { create } from "zustand";
import { Message } from "@/types/chat.types";

export type ChatState = {
    messages: Message[];
    addMessage: (message: Message) => void;
    setMessages: (messages: Message[]) => void;
    updateMessage: (messageId: string, newContent: Partial<Message>) => void;
    clearMessages: () => void;
};

export const useChatStore = create<ChatState>(
    (set) => ({
        messages: [],
        addMessage: (message) => {
            set((state) => ({
                messages: [...state.messages, message]
            }))
        },
        setMessages: (messages) => {
            set({ messages })
        },
        updateMessage: (messageId, newContent) => {
            set((state) => ({
                messages: state.messages.map((message) => message.id === messageId ? { ...message, ...newContent } : message)
            }))
        },
        clearMessages: () => set({ messages: [] })
    }),
);