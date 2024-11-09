// src/components/editor/TiptapEditor.tsx
import React, {useCallback, useRef} from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { defaultExtensions } from './extensions';
import Toolbar from './toolbar/Toolbar';

export interface TiptapEditorProps {
    initialContent?: string;
    onSave?: (content: string) => Promise<void>;
}

type ClickHandler = (e: MouseEvent) => void;

const TiptapEditor: React.FC<TiptapEditorProps> = ({ initialContent, onSave }) => {
    const editorDOMRef = useRef<HTMLElement | null>(null);
    const clickHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);

    const editor = useEditor({
        extensions: defaultExtensions,
        content: initialContent || '<p>Start typing here...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none',
            },
        },
        onCreate: ({ editor }) => {
            // Create the click handler
            const handleClick: ClickHandler = (e: MouseEvent) => {
                const link = (e.target as HTMLElement).closest('a');
                if (link && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    window.open(link.href, '_blank');
                }
            };

            // Store the handler reference
            clickHandlerRef.current = handleClick;

            // Add the event listener
            editor.view.dom.addEventListener('click', handleClick);
        },
        onDestroy: () => {
            // Clean up the event listener
            if (editorDOMRef.current && clickHandlerRef.current) {
                editorDOMRef.current.removeEventListener(
                    'click',
                    clickHandlerRef.current
                );
                // Clear the refs
                clickHandlerRef.current = null;
                editorDOMRef.current = null;
            }
        },
        onUpdate: ({ editor }) => {
            // Optional: Add auto-save functionality here
            console.log(editor.getHTML());
        },
    });

    const handleSave = useCallback(async () => {
        if (editor && onSave) {
            await onSave(editor.getHTML());
        }
    }, [editor, onSave]);

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
            <Toolbar editor={editor} onSave={handleSave} />
            <div className="p-4 min-h-[200px]">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default TiptapEditor;