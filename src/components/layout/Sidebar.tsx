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
        <div className="w-64 bg-gray-50 border-r h-screen p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-700">Documents</h2>
                <button
                    onClick={onNew}
                    className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    New
                </button>
            </div>
            <div className="space-y-1">
                {documents.map((doc) => (
                    <button
                        key={doc.id}
                        onClick={() => onSelect(doc)}
                        className={`
              w-full text-left p-2 rounded text-sm
              ${selectedId === doc.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}
            `}
                    >
                        <div className="font-medium truncate">{doc.title || 'Untitled'}</div>
                        <div className="text-xs text-gray-500">
                            {new Date(doc.metadata.updatedAt).toLocaleDateString()}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
