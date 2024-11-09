import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';  // Add this import
import Toolbar from './Toolbar';

// Export the interface so it can be imported elsewhere
export interface TiptapEditorProps {
    initialContent?: string;
    onSave?: (content: string) => Promise<void>;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ initialContent, onSave }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,  // Add the Underline extension
        ],
        content: initialContent || '<p>Start typing here...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
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
                <EditorContent editor={editor} className="prose max-w-none" />
            </div>
        </div>
    );
};

export default TiptapEditor;