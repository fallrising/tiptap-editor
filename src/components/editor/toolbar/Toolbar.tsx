import React from 'react';
import { Editor } from '@tiptap/react';
import { Save } from 'lucide-react';
import { ToolbarButton } from './ToolbarButton';
import { ToolbarDivider } from './ToolbarDivider';
import { defaultToolbarGroups } from './toolbarItems';

interface ToolbarProps {
    editor: Editor | null;
    onSave?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor, onSave }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b border-gray-200 bg-white sticky top-0">
            <div className="flex flex-wrap items-center gap-1 p-1">
                {defaultToolbarGroups.map((group, index) => (
                    <React.Fragment key={group.title}>
                        <div className="flex items-center gap-1">
                            {group.items.map((item) => (
                                item.customComponent ? (
                                    <item.customComponent
                                        key={item.label}
                                        editor={editor}
                                    />
                                ) : (
                                    <ToolbarButton
                                        key={item.label}
                                        icon={item.icon}
                                        label={item.label}
                                        onClick={() => item.action(editor)}
                                        isActive={item.isActive?.(editor)}
                                    />
                                )
                            ))}
                        </div>
                        {index < defaultToolbarGroups.length - 1 && <ToolbarDivider />}
                    </React.Fragment>
                ))}
                {onSave && (
                    <>
                        <ToolbarDivider />
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