// src/components/editor/toolbar/LinkMenu.tsx
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Editor } from '@tiptap/react';
import { Link as LinkIcon, ExternalLink, Trash2, X } from 'lucide-react';

interface LinkMenuProps {
    editor: Editor;
}

export const LinkMenu: React.FC<LinkMenuProps> = ({ editor }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [url, setUrl] = useState('');
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const isActive = editor.isActive('link');

    // Update URL when the popup is shown
    useEffect(() => {
        if (showPopup && isActive) {
            const attrs = editor.getAttributes('link');
            setUrl(attrs.href || '');
        }
    }, [showPopup, isActive, editor]);

    useEffect(() => {
        if (showPopup && buttonRef.current && popupRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const popupRect = popupRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const wouldGoBelow = buttonRect.bottom + popupRect.height > windowHeight;

            setPosition({
                x: Math.max(0, buttonRect.left),
                y: wouldGoBelow
                    ? buttonRect.top - popupRect.height - 5
                    : buttonRect.bottom + 5,
            });
        }
    }, [showPopup]);

    const showLink = useCallback(() => {
        setShowPopup(true);
    }, []);

    const hideLink = () => {
        setShowPopup(false);
        setUrl('');
    };

    const createLink = useCallback(() => {
        // If URL is empty and there's an existing link, remove it
        if (url === '' && isActive) {
            editor.chain().focus().unsetLink().run();
            hideLink();
            return;
        }

        // Don't create empty links
        if (url === '') {
            hideLink();
            return;
        }

        // Add https:// if no protocol is specified
        const urlWithProtocol = !/^https?:\/\//i.test(url)
            ? `https://${url}`
            : url;

        editor
            .chain()
            .focus()
            .setLink({ href: urlWithProtocol })
            .run();

        hideLink();
    }, [editor, url, isActive]);

    const removeLink = useCallback(() => {
        if (isActive) {
            editor
                .chain()
                .focus()
                .unsetLink()
                .run();
            hideLink();
        }
    }, [editor, isActive]);

    const openLink = useCallback(() => {
        // Always get the fresh link attributes
        const attrs = editor.getAttributes('link');
        if (attrs?.href) {
            window.open(attrs.href, '_blank', 'noopener,noreferrer');
        }
    }, [editor]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            createLink();
        } else if (e.key === 'Escape') {
            hideLink();
        }
    };

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node) &&
                !buttonRef.current?.contains(event.target as Node)
            ) {
                hideLink();
            }
        };

        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={showLink}
                className={`h-8 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center ${
                    isActive ? 'bg-gray-200' : ''
                }`}
                title="Add Link"
            >
                <LinkIcon className="h-4 w-4" />
            </button>

            {showPopup && (
                <div
                    ref={popupRef}
                    style={{
                        position: 'fixed',
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        zIndex: 50,
                    }}
                    className="w-72 bg-white rounded-md shadow-lg border border-gray-200"
                >
                    <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                                {isActive ? 'Edit Link' : 'Add Link'}
                            </span>
                            <button
                                onClick={hideLink}
                                className="text-gray-400 hover:text-gray-600"
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Paste or type a link..."
                                className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:border-blue-500"
                                autoFocus
                            />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-1">
                                {isActive && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                openLink();
                                            }}
                                            className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1 rounded hover:bg-gray-100"
                                            type="button"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            Open
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                removeLink();
                                            }}
                                            className="px-2 py-1 text-sm text-red-600 hover:text-red-800 flex items-center gap-1 rounded hover:bg-gray-100"
                                            type="button"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            Remove
                                        </button>
                                    </>
                                )}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    createLink();
                                }}
                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                type="button"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};