// src/components/layout/Sidebar.tsx
import React from 'react';
import { Document } from '../../types/document';

interface SidebarProps {
    documents: Document[];
    selectedId: string | null;
    onSelect: (doc: Document) => void;
    onNew: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ documents, selectedId, onSelect, onNew }) => {
    return (
        <div className="w-64 bg-gray-50 border-r h-screen flex flex-col">
            <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-700">Documents</h2>
                    <button
                        onClick={onNew}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                    >
                        New
                    </button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-1">
                    {documents.map((doc) => (
                        <button
                            key={doc.id}
                            onClick={() => onSelect(doc)}
                            className={`
                w-full text-left p-3 rounded-md transition-colors
                ${selectedId === doc.id
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'}
              `}
                        >
                            <div className="font-medium truncate">
                                {doc.title || 'Untitled Document'}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {new Date(doc.metadata.updatedAt).toLocaleDateString()}
                            </div>
                        </button>
                    ))}
                    {documents.length === 0 && (
                        <div className="text-center text-gray-500 py-4">
                            No documents yet. Create one!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;