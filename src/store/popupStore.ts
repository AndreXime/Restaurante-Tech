import { create } from 'zustand';

type Message = {
    id: string;
    content: string;
    duration?: number;
};

type PopupState = {
    messages: Message[];
    showMessage: (content: string, duration?: number) => void;
};

export const usePopupStore = create<PopupState>((set) => ({
    messages: [],

    showMessage: (content, duration = 4000) => {
        const id = crypto.randomUUID();
        const newMsg = { id, content, duration };

        set((state) => ({
            messages: [...state.messages, newMsg],
        }));

        setTimeout(() => {
            set((state) => ({
                messages: state.messages.filter((m) => m.id !== id),
            }));
        }, duration);
    },
}));

export const showMessage = (content: string, duration?: number) =>
    usePopupStore.getState().showMessage(content, duration);
