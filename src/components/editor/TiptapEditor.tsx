import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Toolbar from './Toolbar';
import {TextAlign} from "@tiptap/extension-text-align";

export interface TiptapEditorProps {
    initialContent?: string;
    onSave?: (content: string) => Promise<void>;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ initialContent, onSave }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                code: {
                    HTMLAttributes: {
                        class: 'rounded-md bg-gray-100 px-2 py-1 font-mono text-sm',
                    },
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: 'rounded-lg bg-gray-100 p-4 font-mono text-sm',
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: 'border-l-4 border-gray-300 pl-4',
                    },
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: initialContent || '<p>Start typing here...</p>',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
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

    const editorStyles = `
        .ProseMirror h1 {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 0.5em;
        }
        .ProseMirror h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 0.5em;
        }
        .ProseMirror h3 {
            font-size: 1.17em;
            font-weight: bold;
            margin-bottom: 0.5em;
        }
        .ProseMirror ul {
            list-style-type: disc;
            padding-left: 1.5em;
            margin-bottom: 1em;
        }
        .ProseMirror ol {
            list-style-type: decimal;
            padding-left: 1.5em;
            margin-bottom: 1em;
        }
        .ProseMirror blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1rem;
            font-style: italic;
            margin: 1rem 0;
        }
        .ProseMirror code {
            background-color: #f3f4f6;
            padding: 0.2em 0.4em;
            border-radius: 0.25em;
            font-family: monospace;
        }
    `;

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
            <style>{editorStyles}</style>
            <Toolbar editor={editor} onSave={handleSave} />
            <div className="p-4 min-h-[200px]">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default TiptapEditor;