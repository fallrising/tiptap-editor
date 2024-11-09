// src/components/editor/DocumentHeader.tsx
import React, { useState, useCallback } from 'react';
import { Document } from '@/types/document';

interface DocumentHeaderProps {
    document: Document | null;
    onTitleChange: (title: string) => Promise<void>;
    lastSaved?: string;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ document, onTitleChange, lastSaved }) => {
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
                        {document?.title || 'Untitled'}
                    </h1>
                )}
                {lastSaved && (
                    <span className="text-sm text-gray-500">
            Last saved: {new Date(lastSaved).toLocaleTimeString()}
          </span>
                )}
            </div>
            {document && (
                <div className="text-sm text-gray-500">
                    Version: {document.metadata.version}
                </div>
            )}
        </div>
    );
};

export default DocumentHeader;