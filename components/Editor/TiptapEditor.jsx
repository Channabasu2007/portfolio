"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { common, createLowlight } from 'lowlight';
import {
    Bold, Italic, Underline as UnderlineIcon,
    List, Heading1, Heading2,
    ImageIcon, Code as CodeIcon, Quote,
    AlignLeft, AlignCenter, AlignRight,
    Table as TableIcon, Upload
} from 'lucide-react';
import { useCallback, useRef, useEffect } from 'react';
import { useDialogs } from '@/components/ui/Dialogs';

const lowlight = createLowlight(common);

const MenuBar = ({ editor, onAddImage }) => {
    if (!editor) return null;

    const addTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 mb-4 border border-neutral-200/50 dark:border-neutral-800/50 rounded-lg bg-background/80 sticky top-0 z-10 shadow-sm backdrop-blur-md">
            {/* Text Formatting */}
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
            <MenuButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive('underline')}
                icon={<UnderlineIcon size={18} />}
                title="Underline"
            />

            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1 self-center" />

            {/* Alignment */}
            <MenuButton
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                isActive={editor.isActive({ textAlign: 'left' })}
                icon={<AlignLeft size={18} />}
                title="Align Left"
            />
            <MenuButton
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                isActive={editor.isActive({ textAlign: 'center' })}
                icon={<AlignCenter size={18} />}
                title="Align Center"
            />
            <MenuButton
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                isActive={editor.isActive({ textAlign: 'right' })}
                icon={<AlignRight size={18} />}
                title="Align Right"
            />

            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1 self-center" />

            {/* Headings */}
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

            {/* Lists & Block */}
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
            <MenuButton
                onClick={addTable}
                isActive={editor.isActive('table')}
                icon={<TableIcon size={18} />}
                title="Insert Table"
            />

            <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1 self-center" />

            {/* Media */}
            <MenuButton
                onClick={onAddImage}
                icon={<ImageIcon size={18} />}
                title="Add Image URL"
            />
            <label className="p-2 rounded hover:bg-input-bg transition-colors cursor-pointer text-text-muted hover:text-text-main" title="Upload Image">
                <Upload size={18} />
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && editor) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                editor.chain().focus().setImage({ src: event.target.result, alt: file.name }).run();
                            };
                            reader.readAsDataURL(file);
                            // Reset val so same file can be selected again
                            e.target.value = '';
                        }
                    }}
                />
            </label>
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

    // Use a ref for onChange to avoid stale closures in useEditor without re-initializing it
    const onChangeRef = useRef(onChange);
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

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
                inline: false, // false = Block images, better for articles
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
            }),
            Placeholder.configure({
                placeholder: 'Write something amazing...',
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: content || '',
        editable: editable,
        onUpdate: ({ editor }) => {
            onChangeRef.current?.(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px] w-full text-text-main',
            },
            handleDrop: (view, event, slice, moved) => {
                if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
                    const file = event.dataTransfer.files[0];
                    if (file.type.startsWith('image/')) {
                        event.preventDefault();
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const { schema } = view.state;
                            const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
                            const node = schema.nodes.image.create({ src: e.target.result, alt: file.name });
                            const transaction = view.state.tr.insert(coordinates.pos, node);
                            view.dispatch(transaction);
                        };
                        reader.readAsDataURL(file);
                        return true;
                    }
                }
                return false;
            },
            handlePaste: (view, event, slice) => {
                const items = (event.clipboardData || event.originalEvent.clipboardData).items;
                for (const item of items) {
                    if (item.type.indexOf('image') === 0) {
                        const file = item.getAsFile();
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            view.dispatch(view.state.tr.replaceSelectionWith(
                                view.state.schema.nodes.image.create({ src: e.target.result, alt: "Pasted Image" })
                            ));
                        };
                        reader.readAsDataURL(file);
                        event.preventDefault();
                        return true;
                    }
                }
                return false;
            }
        },
        immediatelyRender: false,
    }, [editable]);

    const addImage = useCallback(async () => {
        if (!editor) return;

        // Prompt for URL
        const url = await promptHandler('Add Image', 'Enter image URL:');

        if (url) {
            // Optional Alt Text
            const alt = await promptHandler('Image Alt Text', 'Description for accessibility (optional):', 'Image');
            editor.chain().focus().setImage({ src: url, alt: alt || 'Image' }).run();
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
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100, maxWidth: 500 }}>
                    <div className="flex items-center flex-wrap gap-1 bg-black/90 backdrop-blur-md text-white rounded-lg p-1 shadow-xl border border-neutral-700">
                        {/* Text Styles */}
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={`p-1.5 hover:bg-neutral-700 rounded transition-colors ${editor.isActive('bold') ? 'bg-neutral-700 text-primary' : ''}`}
                            title="Bold"
                        >
                            <Bold size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={`p-1.5 hover:bg-neutral-700 rounded transition-colors ${editor.isActive('italic') ? 'bg-neutral-700 text-primary' : ''}`}
                            title="Italic"
                        >
                            <Italic size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            className={`p-1.5 hover:bg-neutral-700 rounded transition-colors ${editor.isActive('underline') ? 'bg-neutral-700 text-primary' : ''}`}
                            title="Underline"
                        >
                            <UnderlineIcon size={14} />
                        </button>

                        <div className="w-px h-4 bg-neutral-700 mx-1" />

                        {/* Headings */}
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                            className={`p-1.5 hover:bg-neutral-700 rounded transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-neutral-700 text-primary' : ''}`}
                            title="H1"
                        >
                            <Heading1 size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                            className={`p-1.5 hover:bg-neutral-700 rounded transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-neutral-700 text-primary' : ''}`}
                            title="H2"
                        >
                            <Heading2 size={14} />
                        </button>

                        <div className="w-px h-4 bg-neutral-700 mx-1" />

                        {/* Alignment */}
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            className={`p-1.5 hover:bg-neutral-700 rounded transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-neutral-700 text-primary' : ''}`}
                            title="Align Left"
                        >
                            <AlignLeft size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            className={`p-1.5 hover:bg-neutral-700 rounded transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-neutral-700 text-primary' : ''}`}
                            title="Align Center"
                        >
                            <AlignCenter size={14} />
                        </button>

                        <div className="w-px h-4 bg-neutral-700 mx-1" />

                        {/* Lists & Extras */}
                        <button
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={`p-1.5 hover:bg-neutral-700 rounded transition-colors ${editor.isActive('bulletList') ? 'bg-neutral-700 text-primary' : ''}`}
                            title="Bullet List"
                        >
                            <List size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            className={`p-1.5 hover:bg-neutral-700 rounded transition-colors ${editor.isActive('codeBlock') ? 'bg-neutral-700 text-primary' : ''}`}
                            title="Code Block"
                        >
                            <CodeIcon size={14} />
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            className={`p-1.5 hover:bg-neutral-700 rounded transition-colors ${editor.isActive('blockquote') ? 'bg-neutral-700 text-primary' : ''}`}
                            title="Quote"
                        >
                            <Quote size={14} />
                        </button>
                    </div>
                </BubbleMenu>
            )}
        </div>
    );
}
