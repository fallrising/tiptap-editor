import React from 'react';
import { Editor } from '@tiptap/react';
import {
    Bold, Italic, Underline, Strikethrough,
    List, ListOrdered,
    Heading1, Heading2, Heading3,
    Code, Quote, Undo, Redo,
    Save,
    AlignLeft, AlignCenter, AlignRight
} from 'lucide-react';
import { clsx } from 'clsx';

interface ToolbarProps {
    editor: Editor | null;
    onSave?: () => void;
}

interface ToolbarButton {
    icon: React.ElementType;
    label: string;
    action: () => boolean;
    isActive?: () => boolean;
}

interface ToolbarGroup {
    title: string;
    items: ToolbarButton[];
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, onSave }) => {
    if (!editor) {
        return null;
    }

    const toolbarGroups: ToolbarGroup[] = [
        {
            title: 'History',
            items: [
                {
                    icon: Undo,
                    label: 'Undo',
                    action: () => editor.chain().focus().undo().run(),
                },
                {
                    icon: Redo,
                    label: 'Redo',
                    action: () => editor.chain().focus().redo().run(),
                },
            ],
        },
        {
            title: 'Text Style',
            items: [
                {
                    icon: Bold,
                    label: 'Bold',
                    action: () => editor.chain().focus().toggleBold().run(),
                    isActive: () => editor.isActive('bold'),
                },
                {
                    icon: Italic,
                    label: 'Italic',
                    action: () => editor.chain().focus().toggleItalic().run(),
                    isActive: () => editor.isActive('italic'),
                },
                {
                    icon: Underline,
                    label: 'Underline',
                    action: () => editor.chain().focus().toggleUnderline().run(),
                    isActive: () => editor.isActive('underline'),
                },
                {
                    icon: Strikethrough,
                    label: 'Strike',
                    action: () => editor.chain().focus().toggleStrike().run(),
                    isActive: () => editor.isActive('strike'),
                },
            ],
        },
        {
            title: 'Headings',
            items: [
                {
                    icon: Heading1,
                    label: 'Heading 1',
                    action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                    isActive: () => editor.isActive('heading', { level: 1 }),
                },
                {
                    icon: Heading2,
                    label: 'Heading 2',
                    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                    isActive: () => editor.isActive('heading', { level: 2 }),
                },
                {
                    icon: Heading3,
                    label: 'Heading 3',
                    action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                    isActive: () => editor.isActive('heading', { level: 3 }),
                },
            ],
        },
        {
            title: 'Lists',
            items: [
                {
                    icon: List,
                    label: 'Bullet List',
                    action: () => editor.chain().focus().toggleBulletList().run(),
                    isActive: () => editor.isActive('bulletList'),
                },
                {
                    icon: ListOrdered,
                    label: 'Ordered List',
                    action: () => editor.chain().focus().toggleOrderedList().run(),
                    isActive: () => editor.isActive('orderedList'),
                },
            ],
        },
        {
            title: 'Alignment',
            items: [
                {
                    icon: AlignLeft,
                    label: 'Align Left',
                    action: () => editor.chain().focus().setTextAlign('left').run(),
                    isActive: () => editor.isActive({ textAlign: 'left' }),
                },
                {
                    icon: AlignCenter,
                    label: 'Align Center',
                    action: () => editor.chain().focus().setTextAlign('center').run(),
                    isActive: () => editor.isActive({ textAlign: 'center' }),
                },
                {
                    icon: AlignRight,
                    label: 'Align Right',
                    action: () => editor.chain().focus().setTextAlign('right').run(),
                    isActive: () => editor.isActive({ textAlign: 'right' }),
                },
            ],
        },
        {
            title: 'Formatting',
            items: [
                {
                    icon: Code,
                    label: 'Code',
                    action: () => editor.chain().focus().toggleCode().run(),
                    isActive: () => editor.isActive('code'),
                },
                {
                    icon: Quote,
                    label: 'Blockquote',
                    action: () => editor.chain().focus().toggleBlockquote().run(),
                    isActive: () => editor.isActive('blockquote'),
                },
            ],
        },
    ];

    return (
        <div className="border-b border-gray-200 bg-white sticky top-0">
            <div className="flex flex-wrap items-center gap-1 p-1">
                {toolbarGroups.map((group, index) => (
                    <React.Fragment key={group.title}>
                        <div className="flex items-center gap-1">
                            {group.items.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => item.action()}
                                    className={clsx(
                                        "h-8 px-2 py-1 rounded-md",
                                        "hover:bg-gray-100 transition-colors",
                                        "flex items-center justify-center",
                                        item.isActive?.() && "bg-gray-200"
                                    )}
                                    title={item.label}
                                >
                                    <item.icon className="h-4 w-4" />
                                </button>
                            ))}
                        </div>
                        {index < toolbarGroups.length - 1 && (
                            <div className="w-px h-6 bg-gray-200 mx-1" />
                        )}
                    </React.Fragment>
                ))}
                {onSave && (
                    <>
                        <div className="w-px h-6 bg-gray-200 mx-1" />
                        <button
                            onClick={onSave}
                            className="ml-auto px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            Save
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Toolbar;