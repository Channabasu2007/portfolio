"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const Tiptap = dynamic(() => import('@/components/Editor/TiptapEditor'), { ssr: false });
import { Save, ArrowLeft, Loader2, Image as ImageIcon, Eye, Clock, FileText } from 'lucide-react';
import Link from 'next/link';
import { useDialogs } from '@/components/ui/Dialogs';

export default function BlogForm({ initialData = {} }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { showAlert, Dialogs, showPrompt } = useDialogs();

    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        content: initialData.content || '',
        coverImage: initialData.coverImage || '',
        coverImageAlt: initialData.coverImageAlt || '',
        tags: initialData.tags ? initialData.tags.join(', ') : '',
        id: initialData.id || null,
        slug: initialData.slug || '',
        featured: initialData.featured || false,
        visibility: initialData.visibility || 'public',
    });

    // Calculate stats
    const stats = useMemo(() => {
        const text = formData.content.replace(/<[^>]*>/g, '') || '';
        const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
        const readingTime = Math.ceil(wordCount / 200);
        return { wordCount, readingTime };
    }, [formData.content]);

    const [autosaving, setAutosaving] = useState(false);
    const lastSavedWordCountRef = useRef(0);
    const timeoutRef = useRef(null);

    // Auto-save logic
    const handleAutoSave = useCallback(async (currentData) => {
        if (!currentData.title) return; // Don't auto-save without a title

        setAutosaving(true);
        try {
            const method = currentData.id ? 'PUT' : 'POST';
            const url = currentData.id
                ? `/api/blogs/${currentData.id}`
                : '/api/blogs';

            const payload = {
                ...currentData,
                tags: typeof currentData.tags === 'string' ? currentData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : currentData.tags
            };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const updated = await res.json();
                // If it was a new post, update the ID so subsequent saves are updates
                if (!currentData.id && updated._id) {
                    setFormData(prev => ({ ...prev, id: updated._id, slug: updated.slug }));

                    // Optional: Update URL without refresh if desirable, but might be safer to just keep state
                    // window.history.replaceState(null, '', `/dashboard/edit/${updated._id}`);
                }
            }
        } catch (error) {
            console.error("Auto-save failed", error);
        } finally {
            setAutosaving(false);
        }
    }, []);

    useEffect(() => {
        const text = formData.content.replace(/<[^>]*>/g, '') || '';
        const currentWordCount = text.trim().split(/\s+/).filter(Boolean).length;

        // Check if word count changed significantly (approx 6 words)
        // Also ensure we don't save on *every* character, and only if content exists
        if (Math.abs(currentWordCount - lastSavedWordCountRef.current) >= 6 && currentWordCount > 0) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            // Debounce slightly to avoid rapid-fire saves while typing quickly
            timeoutRef.current = setTimeout(() => {
                handleAutoSave(formData);
                lastSavedWordCountRef.current = currentWordCount;
            }, 1000);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [formData, handleAutoSave]);

    const handleSave = async (e, visibilityStatus) => {
        if (e) e.preventDefault();

        // Strict Alt Text Validation
        if (formData.coverImage && !formData.coverImageAlt.trim()) {
            showAlert('Accessibility Error', 'Alt Text is required for the Cover Image.');
            return;
        }

        setLoading(true);

        const payload = {
            ...formData,
            visibility: visibilityStatus, // Explicitly set visibility
            tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : formData.tags
        };

        try {
            const method = initialData.id ? 'PUT' : 'POST';
            const url = initialData.id
                ? `/api/blogs/${initialData.id}`
                : '/api/blogs';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                // If it's a draft, just notify. If published, redirect.
                if (visibilityStatus === 'private') {
                    const updated = await res.json();
                    setFormData(prev => ({ ...prev, id: updated._id, slug: updated.slug, visibility: 'private' }));
                    showAlert('Success', 'Draft saved successfully.');
                } else {
                    router.push('/dashboard');
                    router.refresh();
                }
            } else {
                showAlert('Error', 'Something went wrong while saving.');
            }
        } catch (error) {
            console.error(error);
            showAlert('Error', 'Failed to save post.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialogs />
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col h-full animate-in fade-in duration-500">
                {/* Header */}
                <header className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-xl px-6 py-4 z-40 border-b border-neutral-200/50 dark:border-neutral-800/50">
                    <div className="flex items-center gap-4 flex-1">
                        <Link href="/dashboard" className="p-2 hover:bg-input-bg rounded-full transition-colors text-text-muted hover:text-text-main">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-2 hidden md:block" />
                        <input
                            type="text"
                            placeholder="Untitled Post"
                            value={formData.title}
                            onChange={(e) => {
                                const newTitle = e.target.value;
                                const asSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                                setFormData(prev => ({
                                    ...prev,
                                    title: newTitle,
                                    slug: (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) ? asSlug : prev.slug
                                }));
                            }}
                            className="bg-transparent text-xl md:text-2xl font-bold text-text-main placeholder-text-muted/50 focus:outline-none w-full max-w-2xl"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Stats Display */}
                        <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-text-muted mr-2">
                            <span className="flex items-center gap-1.5">
                                <FileText size={14} />
                                {stats.wordCount} words
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} />
                                {stats.readingTime} min read
                            </span>
                        </div>

                        {formData.id && (
                            <Link
                                href={`/blog/${formData.slug}`}
                                target="_blank"
                                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-muted hover:bg-input-bg rounded-full transition-colors"
                            >
                                <Eye size={16} />
                                Preview
                            </Link>
                        )}

                        <div className={`text-xs font-medium px-3 py-1 rounded-full ${formData.id ? 'bg-green-100/50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100/50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                            {autosaving ? 'Saving...' : (formData.id ? 'Published' : 'Draft')}
                        </div>

                        {/* Save Draft Button */}
                        <button
                            type="button"
                            disabled={loading}
                            onClick={(e) => handleSave(e, 'private')}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-muted hover:bg-input-bg rounded-full transition-all"
                        >
                            <Save size={16} />
                            Save Draft
                        </button>

                        {/* Publish Button */}
                        <button
                            type="button"
                            onClick={(e) => handleSave(e, 'public')}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-2 bg-text-main text-background rounded-full hover:opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-neutral-500/10"
                        >
                            {loading ? <Loader2 className="animate-spin" size={18} /> : (initialData.id && initialData.visibility === 'public' ? <Save size={18} /> : <Eye size={18} />)}
                            {initialData.id && initialData.visibility === 'public' ? 'Update' : 'Publish'}
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
                    {/* Main Editor Area */}
                    <div className="flex-1 overflow-y-auto min-h-[500px] bg-background">
                        <div className="w-full h-full">
                            <Tiptap
                                content={formData.content}
                                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                                onShowPrompt={showPrompt}
                            />
                        </div>
                    </div>

                    {/* Sidebar Details */}
                    <div className="w-full xl:w-[400px] border-l border-neutral-200 dark:border-neutral-800 bg-input-bg/30 overflow-y-auto p-6 space-y-8">

                        {/* Publishing Details Group */}
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 font-semibold text-text-main text-sm uppercase tracking-wider">
                                Publishing Details
                            </h3>

                            <div className="space-y-4 p-4 bg-background rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-text-muted">Featured Post</label>
                                    <div
                                        onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${formData.featured ? 'bg-primary' : 'bg-neutral-200 dark:bg-neutral-700'}`}
                                    >
                                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${formData.featured ? 'translate-x-5' : ''}`} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-text-muted">Visibility</label>
                                    <div className="flex bg-input-bg p-1 rounded-lg border border-neutral-200 dark:border-neutral-700">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, visibility: 'public' })}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${formData.visibility === 'public' ? 'bg-white dark:bg-neutral-600 text-text-main shadow-sm' : 'text-text-muted hover:text-text-main'}`}
                                        >
                                            Public
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, visibility: 'private' })}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${formData.visibility === 'private' ? 'bg-white dark:bg-neutral-600 text-text-main shadow-sm' : 'text-text-muted hover:text-text-main'}`}
                                        >
                                            Private
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">URL Slug</label>
                                    <div className="flex items-center bg-input-bg rounded-lg border border-neutral-200 dark:border-neutral-700 px-3">
                                        <span className="text-text-muted/60 text-sm">/blog/</span>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            className="w-full p-2 bg-transparent border-none focus:ring-0 outline-none text-sm text-text-main font-mono"
                                            placeholder="url-slug"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Tags</label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        className="w-full p-2 bg-input-bg border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-text-main"
                                        placeholder="Tech, Design, AI..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Media Group */}
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 font-semibold text-text-main text-sm uppercase tracking-wider">
                                Media
                            </h3>

                            <div className="p-4 bg-background rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Cover Image URL</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.coverImage}
                                            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                            className="w-full pl-9 p-2 bg-input-bg border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm text-text-main"
                                            placeholder="https://..."
                                        />
                                        <ImageIcon size={16} className="absolute left-3 top-2.5 text-text-muted" />
                                    </div>
                                </div>

                                {formData.coverImage && (
                                    <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-input-bg">
                                        <img src={formData.coverImage} className="w-full h-full object-cover" alt="Preview" />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Alt Text <span className="text-red-500">*</span></label>
                                    <textarea
                                        value={formData.coverImageAlt}
                                        onChange={(e) => setFormData({ ...formData, coverImageAlt: e.target.value })}
                                        className="w-full p-3 bg-input-bg border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm resize-none h-20 max-h-32 overflow-y-auto text-text-main"
                                        placeholder="Describe the image for SEO (Required)..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* SEO Group - LinkedIn Removed */}
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 font-semibold text-text-main text-sm uppercase tracking-wider">
                                SEO
                            </h3>

                            <div className="p-4 bg-background rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-text-muted">Meta Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full p-3 bg-input-bg border border-neutral-200 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all text-sm h-24 max-h-32 resize-none overflow-y-auto text-text-main"
                                        placeholder="Brief summary for search engines..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </>
    );
}
