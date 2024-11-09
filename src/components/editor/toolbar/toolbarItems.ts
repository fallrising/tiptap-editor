import {
    Bold, Italic, Underline, Strikethrough,
    List, ListOrdered,
    Heading1, Heading2, Heading3,
    Code, Quote, Undo, Redo,
    AlignLeft, AlignCenter, AlignRight,
} from 'lucide-react';
import { Editor } from '@tiptap/react';

export interface ToolbarItem {
    icon: any;
    label: string;
    action: (editor: Editor) => boolean;
    isActive?: (editor: Editor) => boolean;
}

export interface ToolbarGroup {
    title: string;
    items: ToolbarItem[];
}

export const defaultToolbarGroups: ToolbarGroup[] = [
    {
        title: 'History',
        items: [
            {
                icon: Undo,
                label: 'Undo',
                action: (editor) => editor.chain().focus().undo().run(),
            },
            {
                icon: Redo,
                label: 'Redo',
                action: (editor) => editor.chain().focus().redo().run(),
            },
        ],
    },
    {
        title: 'Text Style',
        items: [
            {
                icon: Bold,
                label: 'Bold',
                action: (editor) => editor.chain().focus().toggleBold().run(),
                isActive: (editor) => editor.isActive('bold'),
            },
            {
                icon: Italic,
                label: 'Italic',
                action: (editor) => editor.chain().focus().toggleItalic().run(),
                isActive: (editor) => editor.isActive('italic'),
            },
            {
                icon: Underline,
                label: 'Underline',
                action: (editor) => editor.chain().focus().toggleUnderline().run(),
                isActive: (editor) => editor.isActive('underline'),
            },
            {
                icon: Strikethrough,
                label: 'Strike',
                action: (editor) => editor.chain().focus().toggleStrike().run(),
                isActive: (editor) => editor.isActive('strike'),
            },
        ],
    },
    {
        title: 'Headings',
        items: [
            {
                icon: Heading1,
                label: 'Heading 1',
                action: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                isActive:(editor)=> editor.isActive('heading', { level: 1 }),
            },
            {
                icon: Heading2,
                label: 'Heading 2',
                action:(editor)=> editor.chain().focus().toggleHeading({ level: 2 }).run(),
                isActive:(editor)=> editor.isActive('heading', { level: 2 }),
            },
            {
                icon: Heading3,
                label: 'Heading 3',
                action:(editor)=> editor.chain().focus().toggleHeading({ level: 3 }).run(),
                isActive:(editor)=> editor.isActive('heading', { level: 3 }),
            },
        ],
    },
    {
        title: 'Lists',
        items: [
            {
                icon: List,
                label: 'Bullet List',
                action:(editor)=> editor.chain().focus().toggleBulletList().run(),
                isActive:(editor)=> editor.isActive('bulletList'),
            },
            {
                icon: ListOrdered,
                label: 'Ordered List',
                action:(editor)=> editor.chain().focus().toggleOrderedList().run(),
                isActive:(editor)=> editor.isActive('orderedList'),
            },
        ],
    },
    {
        title: 'Alignment',
        items: [
            {
                icon: AlignLeft,
                label: 'Align Left',
                action:(editor)=> editor.chain().focus().setTextAlign('left').run(),
                isActive:(editor)=> editor.isActive({ textAlign: 'left' }),
            },
            {
                icon: AlignCenter,
                label: 'Align Center',
                action:(editor)=> editor.chain().focus().setTextAlign('center').run(),
                isActive:(editor)=> editor.isActive({ textAlign: 'center' }),
            },
            {
                icon: AlignRight,
                label: 'Align Right',
                action:(editor)=> editor.chain().focus().setTextAlign('right').run(),
                isActive:(editor)=> editor.isActive({ textAlign: 'right' }),
            },
        ],
    },
    {
        title: 'Formatting',
        items: [
            {
                icon: Code,
                label: 'Code',
                action:(editor)=> editor.chain().focus().toggleCode().run(),
                isActive:(editor)=> editor.isActive('code'),
            },
            {
                icon: Quote,
                label: 'Blockquote',
                action:(editor)=> editor.chain().focus().toggleBlockquote().run(),
                isActive:(editor)=> editor.isActive('blockquote'),
            },
        ],
    },
];