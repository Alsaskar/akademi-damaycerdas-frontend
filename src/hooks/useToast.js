import { useRef, useState } from "react";

export const useToast = () => {
    const [showToast, setShowToast] = useState(false)
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(false)
    const [progress, setProgress] = useState(100);
    const intervalRef = useRef(null);

    const startToastTimer = () => {
        setShowToast(true);
        setProgress(100);

        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(intervalRef.current);
                    setTimeout(() => setShowToast(false), 300);
                    return 0;
                }
                return prev - 2;
            });
        }, 100);
    };

    const show = (msg, isSuccess = true) => {
        setMessage(msg);
        setSuccess(isSuccess);
        startToastTimer();
    };

    const hide = () => {
        clearInterval(intervalRef.current);
        setShowToast(false);
    };

    return {
        showToast,
        message,
        success,
        progress,
        show,
        hide,
    };
}