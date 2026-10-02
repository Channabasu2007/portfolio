"use client";

import { useEffect, useRef } from "react";

export default function ArticleContent({ content }) {
    const contentRef = useRef(null);

    useEffect(() => {
        const container = contentRef.current;
        if (!container) return;

        const preTags = container.querySelectorAll("pre");
        const timers = [];

        const copyIcon = `
            <svg xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4
                    c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
        `;

        const checkIcon = `
            <svg xmlns="http://www.w3.org/2000/svg"
                width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"
                class="text-green-500">
                <path d="M20 6 9 17l-5-5"/>
            </svg>
        `;

        preTags.forEach((pre) => {
            if (pre.querySelector(".copy-btn")) return;

            if (getComputedStyle(pre).position === "static") {
                pre.style.position = "relative";
            }

            pre.classList.add("group");

            const button = document.createElement("button");
            button.type = "button";
            button.className = [
                "copy-btn absolute right-2 top-2 z-10",
                "rounded-md p-2 text-neutral-400",
                "bg-neutral-800/80 sm:bg-transparent",
                "opacity-100 sm:opacity-0",
                "sm:group-hover:opacity-100 focus:opacity-100",
                "hover:bg-neutral-700/70 hover:text-white",
                "transition-all"
            ].join(" ");

            button.setAttribute("aria-label", "Copy code");
            button.innerHTML = copyIcon;

            let timer;

            button.addEventListener("click", async () => {
                const code =
                    pre.querySelector("code")?.innerText || pre.innerText;

                try {
                    await navigator.clipboard.writeText(code);

                    button.innerHTML = checkIcon;
                    button.setAttribute("aria-label", "Code copied");

                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        button.innerHTML = copyIcon;
                        button.setAttribute("aria-label", "Copy code");
                    }, 2000);

                    timers.push(timer);
                } catch (error) {
                    console.error("Failed to copy:", error);
                    button.setAttribute(
                        "aria-label",
                        "Failed to copy code"
                    );
                }
            });

            pre.appendChild(button);
        });

        return () => {
            timers.forEach(clearTimeout);

            preTags.forEach((pre) => {
                pre.querySelector(".copy-btn")?.remove();
                pre.classList.remove("group");
            });
        };
    }, [content]);

    return (
        // Same container classes as the Header, so the content lines up with the navbar
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div
                ref={contentRef}
                className="
                    article-content
                    prose prose-neutral dark:prose-invert
                    prose-base sm:prose-lg
                    w-full max-w-none min-w-0

                    prose-headings:font-semibold
                    prose-headings:tracking-tight
                    prose-headings:leading-tight
                    prose-headings:text-text-main

                    prose-h1:mt-8 prose-h1:mb-5
                    prose-h1:text-2xl sm:prose-h1:text-4xl

                    prose-h2:mt-10 prose-h2:mb-4
                    prose-h2:text-xl sm:prose-h2:text-3xl

                    prose-h3:mt-8 prose-h3:mb-3
                    prose-h3:text-lg sm:prose-h3:text-2xl

                    prose-h4:mt-6 prose-h4:mb-3
                    prose-h4:text-base sm:prose-h4:text-xl

                    prose-p:my-5
                    prose-p:text-[15px] sm:prose-p:text-base
                    prose-p:leading-7 sm:prose-p:leading-8
                    prose-p:font-normal
                    prose-p:text-text-main/85

                    prose-a:link-highlight

                    prose-img:my-6 sm:prose-img:my-8
                    prose-img:mx-auto
                    prose-img:h-auto
                    prose-img:max-w-full
                    prose-img:rounded-xl

                    prose-ul:my-5
                    prose-ol:my-5
                    prose-li:my-2
                    prose-li:text-[15px] sm:prose-li:text-base
                    prose-li:leading-7

                    prose-blockquote:my-6
                    prose-blockquote:border-l-primary

                    prose-code:rounded
                    prose-code:bg-neutral-100
                    dark:prose-code:bg-neutral-800
                    prose-code:px-1.5
                    prose-code:py-0.5
                    prose-code:text-[13px] sm:prose-code:text-sm
                    prose-code:font-normal
                    prose-code:before:content-none
                    prose-code:after:content-none

                    prose-pre:my-6 sm:prose-pre:my-8
                    prose-pre:max-w-full
                    prose-pre:overflow-x-auto
                    prose-pre:rounded-xl
                    prose-pre:border
                    prose-pre:border-neutral-800
                    prose-pre:bg-[#1e1e1e]
                    prose-pre:p-3 sm:prose-pre:p-5
                    prose-pre:text-[12px] sm:prose-pre:text-sm

                    [&_pre_code]:bg-transparent
                    [&_pre_code]:p-0
                    [&_pre_code]:font-mono
                    [&_pre_code]:text-inherit
                    [&_pre_code]:text-[12px]
                    [&_pre_code]:sm:text-[13px]

                    [&_table]:my-6
                    [&_table]:block
                    [&_table]:w-full
                    [&_table]:overflow-x-auto
                    [&_table]:border-collapse
                    [&_table]:text-left

                    [&_th]:border
                    [&_th]:border-neutral-200
                    dark:[&_th]:border-neutral-800
                    [&_th]:bg-neutral-100
                    dark:[&_th]:bg-neutral-900
                    [&_th]:p-2 sm:[&_th]:p-3
                    [&_th]:text-sm sm:[&_th]:text-base
                    [&_th]:font-semibold
                    [&_th]:text-text-main

                    [&_td]:border
                    [&_td]:border-neutral-200
                    dark:[&_td]:border-neutral-800
                    [&_td]:p-2 sm:[&_td]:p-3
                    [&_td]:text-sm sm:[&_td]:text-base
                    [&_td]:text-text-muted

                    [&_tr:nth-child(even)]:bg-neutral-50/50
                    dark:[&_tr:nth-child(even)]:bg-neutral-900/50
                "
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}