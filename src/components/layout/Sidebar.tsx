import React, { useState, useMemo } from 'react';
import { Document } from '@/types/document';
import SearchBar from './SearchBar';
import SortDropdown, { SortField, SortDirection } from './SortDropdown';
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
    const [sortField, setSortField] = useState<SortField>('updatedAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    const filteredAndSortedDocuments = useMemo(() => {
        // First, filter the documents
        let result = documents;
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(doc => {
                const titleMatch = doc.title.toLowerCase().includes(searchLower);
                if (!searchInContent) return titleMatch;
                const contentMatch = doc.content.toLowerCase().includes(searchLower);
                return titleMatch || contentMatch;
            });
        }

        // Then, sort the filtered results
        return [...result].sort((a, b) => {
            let comparison = 0;
            switch (sortField) {
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'updatedAt':
                    comparison = new Date(b.metadata.updatedAt).getTime() -
                        new Date(a.metadata.updatedAt).getTime();
                    break;
                case 'version':
                    comparison = b.metadata.version - a.metadata.version;
                    break;
                default:
                    break;
            }
            return sortDirection === 'asc' ? comparison * -1 : comparison;
        });
    }, [documents, searchTerm, searchInContent, sortField, sortDirection]);

    return (
        <div className="w-64 bg-gray-50 border-r h-screen flex flex-col">
            <div className="p-4 border-b space-y-3">
                {/* Header with New button */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-700">Documents</h2>
                    <button
                        onClick={onNew}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                    >
                        New
                    </button>
                </div>

                {/* Search Section */}
                <div className="space-y-2">
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

                {/* Sort Section */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Sort by</span>
                    <SortDropdown
                        sortField={sortField}
                        sortDirection={sortDirection}
                        onSortChange={(field, direction) => {
                            setSortField(field);
                            setSortDirection(direction);
                        }}
                    />
                </div>
            </div>

            {/* Document List */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2 space-y-1">
                    {filteredAndSortedDocuments.length > 0 ? (
                        filteredAndSortedDocuments.map((doc) => (
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