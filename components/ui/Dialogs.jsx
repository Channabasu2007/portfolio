"use client";

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export function CustomAlert({ isOpen, onClose, title, message }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            className="fixed inset-0 m-auto backdrop:bg-black/50 bg-transparent p-0 w-full max-w-sm rounded-xl shadow-2xl open:animate-in open:fade-in open:zoom-in-95 backdrop:backdrop-blur-sm"
            onClose={onClose}
        >
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg dark:text-white">{title}</h3>
                    <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                        <X size={18} />
                    </button>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-6">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium"
                    >
                        OK
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export function CustomPrompt({ isOpen, onClose, title, message, defaultValue = '', placeholder = '' }) {
    const dialogRef = useRef(null);
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
        if (isOpen) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen, defaultValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose(value);
    };

    return (
        <dialog
            ref={dialogRef}
            className="fixed inset-0 m-auto backdrop:bg-black/50 bg-transparent p-0 w-full max-w-md rounded-xl shadow-2xl open:animate-in open:fade-in open:zoom-in-95 backdrop:backdrop-blur-sm"
            onClose={() => onClose(null)}
        >
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg dark:text-white">{title}</h3>
                    <button onClick={() => onClose(null)} className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
                        <X size={18} />
                    </button>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">{message}</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={placeholder}
                        className="w-full p-3 bg-neutral-50 dark:bg-neutral-800 border-none rounded-lg focus:ring-2 focus:ring-primary mb-6 text-neutral-900 dark:text-white outline-none"
                        autoFocus
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => onClose(null)}
                            className="px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

// Simple hook to use them
export function useDialogs() {
    const [alertState, setAlertState] = useState({ isOpen: false, title: '', message: '' });
    const [promptState, setPromptState] = useState({ isOpen: false, title: '', message: '', resolve: null, defaultValue: '' });

    const showAlert = (title, message) => {
        setAlertState({ isOpen: true, title, message });
    };

    const showPrompt = (title, message, defaultValue = '') => {
        return new Promise((resolve) => {
            setPromptState({ isOpen: true, title, message, resolve, defaultValue });
        });
    };

    const closeAlert = () => setAlertState(prev => ({ ...prev, isOpen: false }));

    const closePrompt = (value) => {
        if (promptState.resolve) promptState.resolve(value);
        setPromptState(prev => ({ ...prev, isOpen: false }));
    };

    const Dialogs = () => (
        <>
            <CustomAlert
                isOpen={alertState.isOpen}
                onClose={closeAlert}
                title={alertState.title}
                message={alertState.message}
            />
            <CustomPrompt
                isOpen={promptState.isOpen}
                onClose={closePrompt}
                title={promptState.title}
                message={promptState.message}
                defaultValue={promptState.defaultValue}
            />
        </>
    );

    return { showAlert, showPrompt, Dialogs };
}
