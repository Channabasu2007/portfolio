'use client';

import { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ArticleContent({ content }) {
    const contentRef = useRef(null);

    useEffect(() => {
        if (!contentRef.current) return;

        // Find all pre tags (code blocks)
        const preTags = contentRef.current.querySelectorAll('pre');

        preTags.forEach((pre) => {
            // Check if button already exists to prevent duplicates
            if (pre.querySelector('.copy-btn')) return;

            // Create container relative if not already
            if (getComputedStyle(pre).position === 'static') {
                pre.style.position = 'relative';
            }

            // Create button
            const button = document.createElement('button');
            button.className = 'copy-btn absolute top-2 right-2 p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100';
            button.setAttribute('aria-label', 'Copy code');
            button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';

            // Add group class to pre for hover effect if not present
            pre.classList.add('group');

            // Button click handler
            button.addEventListener('click', async () => {
                const code = pre.querySelector('code')?.innerText || pre.innerText;

                try {
                    await navigator.clipboard.writeText(code);

                    // Show success state
                    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check text-green-500"><path d="M20 6 9 17l-5-5"/></svg>';

                    setTimeout(() => {
                        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });

            pre.appendChild(button);
        });
    }, [content]);

    return (
        <div
            ref={contentRef}
            className="article-content prose prose-neutral dark:prose-invert prose-lg max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight
        prose-p:text-text-main/85 prose-p:leading-7 prose-p:font-normal
        prose-a:link-highlight
        prose-img:rounded-xl prose-img:my-8
        prose-code:text-sm prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-[#1e1e1e] prose-pre:text-gray-50 prose-pre:rounded-xl prose-pre:border prose-pre:border-neutral-800 prose-pre:p-4
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_pre_code]:font-mono
        
        /* Improved Table Styles */
        prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-neutral-200 dark:prose-table:border-neutral-800 prose-table:my-8 prose-table:rounded-lg prose-table:overflow-hidden
        prose-thead:bg-neutral-100 dark:prose-thead:bg-neutral-900
        prose-th:border prose-th:border-neutral-200 dark:prose-th:border-neutral-800 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-text-main
        prose-td:border prose-td:border-neutral-200 dark:prose-td:border-neutral-800 prose-td:p-3 prose-td:text-text-muted
        prose-tr:even:bg-neutral-50/50 dark:prose-tr:even:bg-neutral-900/50"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
