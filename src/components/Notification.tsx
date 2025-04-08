import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Notification = (props: { message: string; onClose: () => void }) => {
    const { message, onClose } = props;

    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed right-6 bottom-6 bg-[#5C4033] text-white py-4 px-6 rounded-2xl shadow-2xl backdrop-blur-md
                bg-opacity-90 z-50 text-xl sm:text-3xl flex items-center gap-3 border-4 border-[#C8994AFF]"
            >
                {message}
            </motion.div>
        </AnimatePresence>
    );
};
