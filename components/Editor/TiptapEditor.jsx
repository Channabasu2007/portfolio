"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Bold, Italic, List, Heading1, Heading2, ImageIcon, Code as CodeIcon, Quote } from 'lucide-react';
import { useCallback } from 'react';
import { useDialogs } from '@/components/ui/Dialogs';

const lowlight = createLowlight(common);

const MenuBar = ({ editor, onAddImage }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 mb-4 border border-neutral-200/50 dark:border-neutral-800/50 rounded-lg bg-background/80 sticky top-0 z-10 shadow-sm backdrop-blur-md">
            <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive('bold')}
                icon={<Bold size={18} />}
                title="Bold"
            />
            <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive('italic')}
                icon={<Italic size={18} />}
                title="Italic"
            />
            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1 self-center" />
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editor.isActive('heading', { level: 1 })}
                icon={<Heading1 size={18} />}
                title="Heading 1"
            />
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editor.isActive('heading', { level: 2 })}
                icon={<Heading2 size={18} />}
                title="Heading 2"
            />
            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1 self-center" />
            <MenuButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive('bulletList')}
                icon={<List size={18} />}
                title="Bullet List"
            />
            <MenuButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                isActive={editor.isActive('codeBlock')}
                icon={<CodeIcon size={18} />}
                title="Code Block"
            />
            <MenuButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive('blockquote')}
                icon={<Quote size={18} />}
                title="Quote"
            />
            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1 self-center" />
            <MenuButton
                onClick={onAddImage}
                icon={<ImageIcon size={18} />}
                title="Add Image"
            />
        </div>
    );
};

const MenuButton = ({ onClick, isActive, icon, title }) => (
    <button
        onClick={onClick}
        title={title}
        className={`p-2 rounded hover:bg-input-bg transition-colors ${isActive ? 'bg-input-bg text-primary-dark ring-1 ring-primary-dark/20' : 'text-text-muted'
            }`}
        type="button"
    >
        {icon}
    </button>
);

export default function Tiptap({ content, onChange, editable = true, onShowPrompt }) {
    const { showPrompt, Dialogs } = useDialogs();  // Local dialogs for editor if used standalone

    // Use prop onShowPrompt if available (from parent to share dialogs), otherwise local
    const promptHandler = onShowPrompt || showPrompt;

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                codeBlock: false, // We use lowlight
            }),
            CodeBlockLowlight.configure({
                lowlight,
                defaultLanguage: 'javascript',
            }),
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: 'Write something amazing...',
            }),
        ],
        content: content || '',
        editable: editable,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px] w-full text-text-main',
            },
        },
        immediatelyRender: false,
    });

    const addImage = useCallback(async () => {
        if (!editor) return;

        // First prompt for URL
        const url = await promptHandler('Add Image', 'Enter image URL:');

        if (url) {
            let alt = '';
            // Enforce Alt Text
            while (!alt) {
                alt = await promptHandler('Image Alt Text (Required)', 'Please describe the image for accessibility:', 'Image description');

                // If user cancels (returns null), break the loop and don't add image
                if (alt === null) return;

                if (!alt.trim()) {
                    // We can't show an alert easily here without access to showAlert, so we just loop
                    // Or potentially pass showAlert too. For now let's just re-prompt with a stronger message.
                    // The while loop handles the re-prompt.
                }
            }
            editor.chain().focus().setImage({ src: url, alt }).run();
        }
    }, [editor, promptHandler]);

    return (
        <div className="w-full relative">
            {!onShowPrompt && !editable && <Dialogs />} {/* Render dialogs if standalone */}

            {editable && <MenuBar editor={editor} onAddImage={addImage} />}

            <div
                className={editable ? "p-4 md:p-12 min-h-[600px] bg-background group cursor-text w-full focus-within:ring-0 outline-none" : ""}
                onClick={() => editor?.chain().focus().run()}
            >
                <div className="max-w-4xl mx-auto w-full h-full">
                    <EditorContent editor={editor} />
                </div>
            </div>

            {/* Bubble Menu for quick actions */}
            {editor && (
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <div className="flex items-center bg-black/90 backdrop-blur-md text-white rounded-lg overflow-hidden shadow-xl border border-neutral-700">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`p-2 hover:bg-neutral-700 transition-colors ${editor.isActive('bold') ? 'bg-neutral-700 text-primary' : ''}`}
                        >
                            <Bold size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`p-2 hover:bg-neutral-700 transition-colors ${editor.isActive('italic') ? 'bg-neutral-700 text-primary' : ''}`}
                        >
                            <Italic size={14} />
                        </button>
                    </div>
                </BubbleMenu>
            )}
        </div>
    );
}
