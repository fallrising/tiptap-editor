import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';

const TiptapEditor: React.FC = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Start typing here...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
        },
    });

    const handleSave = useCallback(() => {
        if (editor) {
            const content = editor.getHTML();
            console.log('Saved content:', content);
        }
    }, [editor]);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white shadow-sm rounded-lg">
                <Toolbar editor={editor} onSave={handleSave} />
                <div className="p-4 min-h-[200px] border-t">
                    <EditorContent editor={editor} className="prose max-w-none" />
                </div>
            </div>
        </div>
    );
};

export default TiptapEditor;
