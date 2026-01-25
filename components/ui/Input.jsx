import { twMerge } from 'tailwind-merge';

export function Input({ className, ...props }) {
    return (
        <input
            className={twMerge(
                "modern-input block w-full rounded-none py-3 px-4 text-sm text-text-main placeholder-text-light/50 bg-input-bg focus:bg-white",
                className
            )}
            {...props}
        />
    );
}

export function Textarea({ className, ...props }) {
    return (
        <textarea
            className={twMerge(
                "modern-input block w-full rounded-none py-3 px-4 text-sm text-text-main placeholder-text-light/50 bg-input-bg focus:bg-white resize-none",
                className
            )}
            {...props}
        />
    );
}
