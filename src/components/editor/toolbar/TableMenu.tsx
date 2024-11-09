import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Table as TableIcon, Plus, Trash2 } from 'lucide-react';

interface TableMenuProps {
    editor: Editor;
}

export const TableMenu: React.FC<TableMenuProps> = ({ editor }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const insertTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        setShowDropdown(false);
    };

    const addColumnBefore = () => {
        editor.chain().focus().addColumnBefore().run();
    };

    const addColumnAfter = () => {
        editor.chain().focus().addColumnAfter().run();
    };

    const deleteColumn = () => {
        editor.chain().focus().deleteColumn().run();
    };

    const addRowBefore = () => {
        editor.chain().focus().addRowBefore().run();
    };

    const addRowAfter = () => {
        editor.chain().focus().addRowAfter().run();
    };

    const deleteRow = () => {
        editor.chain().focus().deleteRow().run();
    };

    const deleteTable = () => {
        editor.chain().focus().deleteTable().run();
        setShowDropdown(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="h-8 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                title="Table"
            >
                <TableIcon className="h-4 w-4" />
            </button>

            {showDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                        {!editor.isActive('table') ? (
                            <button
                                onClick={insertTable}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Insert Table
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={addColumnBefore}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                >
                                    Add Column Before
                                </button>
                                <button
                                    onClick={addColumnAfter}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                >
                                    Add Column After
                                </button>
                                <button
                                    onClick={deleteColumn}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                >
                                    Delete Column
                                </button>
                                <div className="border-t border-gray-200"></div>
                                <button
                                    onClick={addRowBefore}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                >
                                    Add Row Before
                                </button>
                                <button
                                    onClick={addRowAfter}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                >
                                    Add Row After
                                </button>
                                <button
                                    onClick={deleteRow}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                >
                                    Delete Row
                                </button>
                                <div className="border-t border-gray-200"></div>
                                <button
                                    onClick={deleteTable}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete Table
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};