import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function CodeBlock({ node, updateAttributes, extension }) {
    const [copied, setCopied] = useState(false);
    const languages = extension.options.lowlight.listLanguages();
    const defaultLanguage = node.attrs.language || 'javascript';

    const copyToClipboard = () => {
        const text = node.textContent;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <NodeViewWrapper className="relative group my-6">
            <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={copyToClipboard}
                    className="p-1.5 bg-neutral-800/50 backdrop-blur-sm hover:bg-neutral-800 text-neutral-300 rounded border border-neutral-700 transition-all active:scale-95"
                    title="Copy code"
                >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
            </div>

            <pre className="!bg-[#0d1117] rounded-xl border border-neutral-800/50 shadow-2xl overflow-hidden">
                <NodeViewContent as="code" className={`language-${defaultLanguage} !bg-transparent block p-6 text-sm leading-relaxed`} />
            </pre>
        </NodeViewWrapper>
    );
}
