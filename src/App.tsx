import React, { useState, useEffect } from 'react';
import TiptapEditor from './components/editor/TiptapEditor';  // Make sure this import is correct
import Sidebar from './components/layout/Sidebar';
import { Document } from './types/document';

const App: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load documents from mock server
        fetch('http://localhost:3001/documents')
            .then(res => res.json())
            .then(data => {
                setDocuments(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading documents:', error);
                setLoading(false);
            });
    }, []);

    const handleSave = async (content: string) => {
        if (selectedDoc) {
            const updatedDoc = {
                ...selectedDoc,
                content,
                metadata: {
                    ...selectedDoc.metadata,
                    updatedAt: new Date().toISOString(),
                    version: selectedDoc.metadata.version + 1,
                },
            };

            try {
                const response = await fetch(`http://localhost:3001/documents/${selectedDoc.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedDoc),
                });

                if (response.ok) {
                    const saved = await response.json();
                    setDocuments(docs =>
                        docs.map(doc => doc.id === saved.id ? saved : doc)
                    );
                    setSelectedDoc(saved);
                }
            } catch (error) {
                console.error('Error saving document:', error);
            }
        }
    };

    const handleNew = async () => {
        const newDoc: Partial<Document> = {
            title: 'Untitled Document',
            content: '<p>Start typing here...</p>',
            metadata: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: '1', // Hardcoded user ID for now
                version: 1,
            },
        };

        try {
            const response = await fetch('http://localhost:3001/documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDoc),
            });

            if (response.ok) {
                const created = await response.json();
                setDocuments(docs => [...docs, created]);
                setSelectedDoc(created);
            }
        } catch (error) {
            console.error('Error creating document:', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                documents={documents}
                selectedId={selectedDoc?.id || null}
                onSelect={setSelectedDoc}
                onNew={handleNew}
            />
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm px-6 py-4">
                    <h1 className="text-xl font-semibold text-gray-800">
                        {selectedDoc?.title || 'Select or create a document'}
                    </h1>
                </header>
                <main className="p-6">
                    {loading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : (
                        <TiptapEditor
                            key={selectedDoc?.id}
                            initialContent={selectedDoc?.content}
                            onSave={handleSave}
                        />
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;