// src/App.tsx
import React, { useState, useEffect } from 'react';
import TiptapEditor from './components/editor/TiptapEditor';
import Sidebar from './components/layout/Sidebar';
import DocumentHeader from './components/editor/DocumentHeader';
import LoginForm from './components/auth/LoginForm';
import {CreateDocumentDto, Document} from './types/document';
import { User } from './types/auth';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastSaved, setLastSaved] = useState<string | undefined>();

    useEffect(() => {
        // Try to restore user session
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    useEffect(() => {
        if (user) {
            // Load documents when user is authenticated
            fetch(`${process.env.REACT_APP_API_URL}/documents?userId=${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setDocuments(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error loading documents:', error);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleLogin = (loggedInUser: User) => {
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setDocuments([]);
        setSelectedDoc(null);
    };

    const handleSave = async (content: string) => {
        if (selectedDoc && user) {
            const updatedDoc: Partial<Document> = {
                ...selectedDoc,
                content,
                metadata: {
                    ...selectedDoc.metadata,
                    updatedAt: new Date().toISOString(),
                    version: selectedDoc.metadata.version + 1,
                },
            };

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/documents/${selectedDoc.id}`, {
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
                    setLastSaved(new Date().toISOString());
                }
            } catch (error) {
                console.error('Error saving document:', error);
            }
        }
    };

    const handleTitleChange = async (newTitle: string) => {
        if (selectedDoc && user) {
            const updatedDoc = {
                ...selectedDoc,
                title: newTitle,
                metadata: {
                    ...selectedDoc.metadata,
                    updatedAt: new Date().toISOString(),
                },
            };

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/documents/${selectedDoc.id}`, {
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
                console.error('Error updating title:', error);
            }
        }
    };

    const handleNew = async () => {
        if (!user) return;

        const newDoc: CreateDocumentDto = {
            title: 'Untitled Document',
            content: '<p>Start typing here...</p>',
            userId: user.id,
            metadata: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: user.id,
                version: 1,
            }
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/documents`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDoc),
            });

            if (response.ok) {
                const created: Document = await response.json();
                setDocuments(prev => [...prev, created]);
                setSelectedDoc(created);
                setLastSaved(new Date().toISOString());
            } else {
                throw new Error('Failed to create document');
            }
        } catch (error) {
            console.error('Error creating new document:', error);
            // TODO: Add error notification
        }
    };

    if (!user) {
        return <LoginForm onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                documents={documents}
                selectedId={selectedDoc?.id || null}
                onSelect={setSelectedDoc}
                onNew={handleNew}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-2 bg-white border-b">
                    <h1 className="text-xl font-bold">Rich Text Editor</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">{user.username}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {selectedDoc && (
                    <DocumentHeader
                        document={selectedDoc}
                        onTitleChange={handleTitleChange}
                        lastSaved={lastSaved}
                    />
                )}

                <main className="flex-1 overflow-auto p-6">
                    {loading ? (
                        <div className="text-center py-10">Loading...</div>
                    ) : (
                        selectedDoc && (
                            <TiptapEditor
                                key={selectedDoc.id}
                                initialContent={selectedDoc.content}
                                onSave={handleSave}
                            />
                        )
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;