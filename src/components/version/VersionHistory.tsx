import React from 'react';
import { DocumentVersion } from '@/types/version';
import { User } from '@/types/auth';

interface VersionHistoryProps {
    versions: DocumentVersion[];
    currentUser: User;
    isOpen: boolean;
    onClose: () => void;
    onRestore: (version: DocumentVersion) => Promise<void>;
}

const VersionHistory: React.FC<VersionHistoryProps> = ({
                                                           versions,
                                                           currentUser,
                                                           isOpen,
                                                           onClose,
                                                           onRestore,
                                                       }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Version History</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>
                <div className="p-4 max-h-[60vh] overflow-y-auto">
                    {versions.map((version) => (
                        <div
                            key={version.id}
                            className="border-b last:border-0 py-3 flex justify-between items-center"
                        >
                            <div>
                                <div className="font-medium">
                                    Version {version.version}
                                    {version.changeDescription && (
                                        <span className="ml-2 text-gray-600">
                      - {version.changeDescription}
                    </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {new Date(version.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <button
                                onClick={() => onRestore(version)}
                                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Restore
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VersionHistory;