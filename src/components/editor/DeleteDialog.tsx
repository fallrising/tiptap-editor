import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       onConfirm,
                                                       title,
                                                   }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
                <div className="flex items-center gap-3 mb-4 text-red-600">
                    <Trash2 className="h-6 w-6" />
                    <h2 className="text-lg font-semibold">Delete Document</h2>
                </div>

                <p className="text-gray-600 mb-4">
                    Are you sure you want to delete "{title}"? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;