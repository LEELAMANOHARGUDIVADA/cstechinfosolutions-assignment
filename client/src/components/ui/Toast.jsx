import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "default", position = "bottom-right") => {
    const id = crypto.randomUUID();
    const toast = { id, message, type, position };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const groupedToasts = toasts.reduce((acc, toast) => {
    acc[toast.position] = [...(acc[toast.position] || []), toast];
    return acc;
  }, {});

  const positionClasses = {
    "top-right": "top-5 right-5",
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "top-left": "top-5 left-5",
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {Object.entries(groupedToasts).map(([position, group]) => (
        <div
          key={position}
          className={`fixed z-[9999] space-y-2 ${positionClasses[position]}`}
        >
          <AnimatePresence>
            {group.map((toast) => (
              <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.4 } }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative flex items-center gap-2 px-4 py-3 rounded-md shadow-lg text-sm text-white max-w-xs transition-opacity ${
                toast.type === "success"
                  ? "bg-green-600"
                  : toast.type === "error"
                  ? "bg-red-600"
                  : "bg-zinc-800"
              }`}
            >
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-auto text-white/80 hover:text-white transition"
              >
                <X size={14} />
              </button>
            </motion.div>
            
            ))}
          </AnimatePresence>
        </div>
      ))}
    </ToastContext.Provider>
  );
};
