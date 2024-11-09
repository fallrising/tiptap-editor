import React, { useState } from 'react';
import { Document } from '@/types/document';
import ExportMenu from './ExportMenu';
import { Trash2 } from 'lucide-react';

// Update interface
interface DocumentHeaderProps {
    document: Document | null;
    onTitleChange: (title: string) => Promise<void>;
    onVersionHistoryClick: () => void;
    onDeleteClick: (document: Document) => void;  // Add this line
    lastSaved?: string;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({
                                                           document,
                                                           onTitleChange,
                                                           onVersionHistoryClick,
                                                           onDeleteClick,
                                                           lastSaved,
                                                       }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(document?.title || 'Untitled');

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (document && title !== document.title) {
            await onTitleChange(title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setTitle(document?.title || 'Untitled');
            setIsEditing(false);
        } else if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    if (!document) {
        return null;
    }

    return (
        <div className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
            <div className="flex items-center space-x-4">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={() => handleSubmit()}
                            onKeyDown={handleKeyDown}
                            className="px-2 py-1 border rounded focus:outline-none focus:border-blue-500"
                            autoFocus
                        />
                    </form>
                ) : (
                    <h1
                        className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
                        onClick={() => setIsEditing(true)}
                        title="Click to edit title"
                    >
                        {document.title || 'Untitled'}
                    </h1>
                )}
                {lastSaved && (
                    <span className="text-sm text-gray-500">
                        Last saved: {new Date(lastSaved).toLocaleTimeString()}
                    </span>
                )}
            </div>
            <div className="flex items-center space-x-4">
                <ExportMenu
                    content={document.content}
                    title={document.title}
                />
                <button
                    onClick={onVersionHistoryClick}
                    className="text-sm text-blue-500 hover:text-blue-600"
                >
                    View History
                </button>
                <button
                    onClick={() => onDeleteClick(document)}
                    className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                    <Trash2 className="h-4 w-4"/>
                    Delete
                </button>
                <div className="text-sm text-gray-500">
                    Version: {document.metadata.version}
                </div>
            </div>
        </div>
    );
};

export default DocumentHeader;