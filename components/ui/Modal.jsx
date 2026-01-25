"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

export function Modal({ isOpen, onClose, title, children, footer }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => (document.body.style.overflow = "unset");
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden pointer-events-auto border border-gray-100"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                                <h3 className="font-medium text-text-main">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="text-text-light hover:text-text-main transition-colors p-1"
                                >
                                    <IoClose className="text-xl" />
                                </button>
                            </div>
                            <div className="p-6">
                                {children}
                            </div>
                            {footer && (
                                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
