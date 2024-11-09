import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { TextAlign } from "@tiptap/extension-text-align";

export const defaultExtensions = [
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
];
