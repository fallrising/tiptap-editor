import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { defaultExtensions } from './extensions';
import Toolbar from './toolbar/Toolbar';
import './styles/editor.css';

export interface TiptapEditorProps {
    initialContent?: string;
    onSave?: (content: string) => Promise<void>;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ initialContent, onSave }) => {
    const editor = useEditor({
        extensions: defaultExtensions,
        content: initialContent || '<p>Start typing here...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none',
            },
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
            <div className="p-4 min-h-[200px] prose-container">
                <EditorContent
                    editor={editor}
                    className="prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none"
                />
            </div>
        </div>
    );
};

export default TiptapEditor;