import React, { useState } from 'react';
import { ArrowDownAZ, ArrowUpAZ, Calendar, Hash, ChevronDown } from 'lucide-react';

export type SortField = 'title' | 'updatedAt' | 'version';
export type SortDirection = 'asc' | 'desc';

interface SortOption {
    field: SortField;
    label: string;
    icon: React.ReactNode;
}

interface SortDropdownProps {
    sortField: SortField;
    sortDirection: SortDirection;
    onSortChange: (field: SortField, direction: SortDirection) => void;
}

const sortOptions: SortOption[] = [
    {
        field: 'title',
        label: 'Title',
        icon: <ArrowDownAZ className="h-4 w-4" />,
    },
    {
        field: 'updatedAt',
        label: 'Last Updated',
        icon: <Calendar className="h-4 w-4" />,
    },
    {
        field: 'version',
        label: 'Version',
        icon: <Hash className="h-4 w-4" />,
    },
];

const SortDropdown: React.FC<SortDropdownProps> = ({
                                                       sortField,
                                                       sortDirection,
                                                       onSortChange,
                                                   }) => {
    const [isOpen, setIsOpen] = useState(false);

    const currentOption = sortOptions.find(option => option.field === sortField);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-2 py-1 text-sm bg-white border rounded-md hover:bg-gray-50"
            >
                <span className="flex items-center gap-1">
                    {currentOption?.icon}
                    {currentOption?.label}
                </span>
                <ChevronDown className="h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-10">
                    {sortOptions.map((option) => (
                        <div key={option.field} className="p-1">
                            <button
                                onClick={() => {
                                    const newDirection =
                                        option.field === sortField
                                            ? sortDirection === 'asc' ? 'desc' : 'asc'
                                            : 'asc';
                                    onSortChange(option.field, newDirection);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-gray-100 ${
                                    option.field === sortField ? 'bg-gray-50' : ''
                                }`}
                            >
                                <span className="flex items-center gap-2">
                                    {option.icon}
                                    {option.label}
                                </span>
                                {option.field === sortField && (
                                    sortDirection === 'asc'
                                        ? <ArrowDownAZ className="h-4 w-4" />
                                        : <ArrowUpAZ className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;