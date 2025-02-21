import {useEffect} from "react";

export const Notification = (props : {message : string, onClose : ()=> void}) => {
    const {message, onClose} = props;

    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed right-4 bottom-4 bg-[#5C4033] text-white py-5 px-6 rounded-lg shadow-lg animate-slide-in z-20 text-3xl">
            {message}
        </div>
    )
}