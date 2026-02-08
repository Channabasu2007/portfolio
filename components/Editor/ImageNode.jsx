import { NodeViewWrapper } from '@tiptap/react';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function ImageNode(props) {
    const { node, updateAttributes, selected } = props;
    const { src, alt, width, height } = node.attrs;

    const [w, setW] = useState(width || '100%');
    const resizingRef = useRef(false);
    const startXRef = useRef(0);
    const startWidthRef = useRef(0);
    const imgRef = useRef(null);

    useEffect(() => {
        setW(width || '100%');
    }, [width]);

    const onMouseDown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        resizingRef.current = true;
        startXRef.current = e.clientX;

        // Get current width in pixels
        const currentWidth = imgRef.current ? imgRef.current.offsetWidth : 0;
        startWidthRef.current = currentWidth;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, []);

    const onMouseMove = useCallback((e) => {
        if (!resizingRef.current) return;

        const deltaX = e.clientX - startXRef.current;
        const newWidth = Math.max(100, startWidthRef.current + deltaX); // Min width 100px

        setW(`${newWidth}px`);
    }, []);

    const onMouseUp = useCallback((e) => {
        if (!resizingRef.current) return;

        resizingRef.current = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        // Update attributes with final width
        // We need to calculate final width based on the last mouse position or state
        // Since setW updates state, we can just use the current w, but state updates might be async/batched.
        // Better to recalculate or rely on the last set value. 
        // Actually, inside this closure 'w' is stale.
        // But we can calculate it again:
        const deltaX = e.clientX - startXRef.current;
        const finalWidth = Math.max(100, startWidthRef.current + deltaX);

        updateAttributes({ width: `${finalWidth}px` });
    }, [updateAttributes]);


    return (
        <NodeViewWrapper className="image-node-view flex" style={{ width: '100%', justifyContent: node.attrs.textAlign === 'center' ? 'center' : (node.attrs.textAlign === 'right' ? 'flex-end' : 'flex-start') }}>
            <div style={{ position: 'relative', display: 'inline-block', maxWidth: '100%' }}>
                <img
                    ref={imgRef}
                    src={src}
                    alt={alt}
                    style={{
                        width: w,
                        height: 'auto',
                        display: 'block',
                        maxWidth: '100%',
                        transition: resizingRef.current ? 'none' : 'width 0.2s'
                    }}
                    className={`rounded-lg ${selected ? 'ring-2 ring-primary' : ''}`}
                />

                {selected && (
                    <>
                        {/* Resize Handle - Right Side */}
                        <div
                            onMouseDown={onMouseDown}
                            className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-primary/50 transition-colors z-10 flex items-center justify-center opacity-0 hover:opacity-100 group-hover:opacity-100"
                            style={{ right: -10 }} // Position partially outside
                        >
                            <div className="w-1 h-8 bg-primary rounded-full" />
                        </div>
                        {/* Visual overlay to indicate selection explicitly if needed, but ring is enough */}
                    </>
                )}
            </div>
        </NodeViewWrapper>
    );
}
