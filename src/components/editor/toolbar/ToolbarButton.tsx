import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface ToolbarButtonProps {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
    isActive?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
                                                                icon: Icon,
                                                                label,
                                                                onClick,
                                                                isActive = false,
                                                            }) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "h-8 px-2 py-1 rounded-md",
                "hover:bg-gray-100 transition-colors",
                "flex items-center justify-center",
                isActive && "bg-gray-200"
            )}
            title={label}
        >
            <Icon className="h-4 w-4" />
        </button>
    );
};