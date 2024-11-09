// src/components/editor/Toolbar.tsx
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

    const toolbarGroups = [
        {
            title: 'Text Style',
            items: [
                {
                    icon: 'B',
                    label: 'Bold',
                    action: () => editor.chain().focus().toggleBold().run(),
                    isActive: () => editor.isActive('bold'),
                },
                {
                    icon: 'I',
                    label: 'Italic',
                    action: () => editor.chain().focus().toggleItalic().run(),
                    isActive: () => editor.isActive('italic'),
                },
                {
                    icon: 'U',
                    label: 'Underline',
                    action: () => editor.chain().focus().toggleUnderline().run(),
                    isActive: () => editor.isActive('underline'),
                },
                {
                    icon: 'S',
                    label: 'Strike',
                    action: () => editor.chain().focus().toggleStrike().run(),
                    isActive: () => editor.isActive('strike'),
                },
            ],
        },
        // ... rest of the toolbar groups remain the same
    ];

    return (
        <div className="border-b border-gray-200 bg-white sticky top-0">
            <div className="flex flex-wrap gap-4 p-2">
                {toolbarGroups.map((group, index) => (
                    <div key={index} className="flex items-center gap-1">
                        {group.items.map((item, itemIndex) => (
                            <button
                                key={itemIndex}
                                onClick={item.action}
                                className={`
                  p-2 rounded hover:bg-gray-100 transition-colors
                  ${item.isActive() ? 'bg-gray-200' : ''}
                `}
                                title={item.label}
                            >
                                {item.icon}
                            </button>
                        ))}
                        {index < toolbarGroups.length - 1 && (
                            <div className="w-px h-6 bg-gray-300 mx-2" />
                        )}
                    </div>
                ))}
                {onSave && (
                    <button
                        onClick={onSave}
                        className="ml-auto px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Save
                    </button>
                )}
            </div>
        </div>
    );
};

export default Toolbar;