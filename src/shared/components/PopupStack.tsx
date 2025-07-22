import { usePopupStore } from '@/store/popupStore';

export const Popup = () => {
    const messages = usePopupStore((s) => s.messages);

    return (
        <div className="text-lg fixed top-4 right-4 flex flex-col gap-3 z-999 max-w-[500px]">
            {messages.map((msg) => (
                <div key={msg.id} className="popup-message">
                    {msg.content}
                </div>
            ))}
        </div>
    );
};
