import React, { useState, useMemo } from 'react';
import { Document } from '@/types/document';
import SearchBar from './SearchBar';
import { SlidersHorizontal } from 'lucide-react';

interface SidebarProps {
    documents: Document[];
    selectedId: string | null;
    onSelect: (doc: Document) => void;
    onNew: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             documents,
                                             selectedId,
                                             onSelect,
                                             onNew,
                                         }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [searchInContent, setSearchInContent] = useState(false);

    const filteredDocuments = useMemo(() => {
        if (!searchTerm) return documents;

        const searchLower = searchTerm.toLowerCase();
        return documents.filter(doc => {
            const titleMatch = doc.title.toLowerCase().includes(searchLower);
            if (!searchInContent) return titleMatch;

            const contentMatch = doc.content.toLowerCase().includes(searchLower);
            return titleMatch || contentMatch;
        });
    }, [documents, searchTerm, searchInContent]);

    return (
        <div className="w-64 bg-gray-50 border-r h-screen flex flex-col">
            <div className="p-4 border-b space-y-2">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-gray-700">Documents</h2>
                    <button
                        onClick={onNew}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                    >
                        New
                    </button>
                </div>

                <div className="relative">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search documents..."
                    />
                    <button
                        onClick={() => setShowSearchOptions(!showSearchOptions)}
                        className={`absolute right-2 top-2 p-1 rounded-md hover:bg-gray-100 ${
                            showSearchOptions ? 'bg-gray-100' : ''
                        }`}
                        title="Search options"
                    >
                        <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                    </button>
                </div>

                {showSearchOptions && (
                    <div className="p-2 bg-white rounded-md shadow-sm border">
                        <label className="flex items-center space-x-2 text-sm">
                            <input
                                type="checkbox"
                                checked={searchInContent}
                                onChange={(e) => setSearchInContent(e.target.checked)}
                                className="rounded text-blue-500 focus:ring-blue-500"
                            />
                            <span>Search in content</span>
                        </label>
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-1">
                    {filteredDocuments.length > 0 ? (
                        filteredDocuments.map((doc) => (
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
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-4">
                            {searchTerm
                                ? 'No documents found matching your search.'
                                : 'No documents yet. Create one!'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;