import React from 'react';
import { Editor } from '@tiptap/react';

interface ToolbarProps {
    editor: Editor | null;
    onSave?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, onSave }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2 p-3 border-b">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded border ${
                    editor.isActive('bold') ? 'bg-gray-200' : 'bg-white'
                }`}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded border ${
                    editor.isActive('italic') ? 'bg-gray-200' : 'bg-white'
                }`}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-3 py-1 rounded border ${
                    editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'bg-white'
                }`}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1 rounded border ${
                    editor.isActive('bulletList') ? 'bg-gray-200' : 'bg-white'
                }`}
            >
                Bullet List
            </button>
            {onSave && (
                <button
                    onClick={onSave}
                    className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 ml-auto"
                >
                    Save
                </button>
            )}
        </div>
    );
};

export default Toolbar;