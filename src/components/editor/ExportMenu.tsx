import React, { useState } from 'react';
import { Download, ChevronDown, FileText, Code, File } from 'lucide-react';
import TurndownService from 'turndown';

interface ExportMenuProps {
    content: string;
    title: string;
}

const ExportMenu: React.FC<ExportMenuProps> = ({ content, title }) => {
    const [isOpen, setIsOpen] = useState(false);

    const sanitizeFilename = (filename: string): string => {
        return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    };

    const downloadFile = (content: string, filename: string, type: string) => {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const exportAsHTML = () => {
        const beautifiedHTML = content
            .replace(/<\/?[^>]+(>|$)/g, match => `\n${match}\n`) // Add newlines around tags
            .replace(/^\s*[\r\n]/gm, '') // Remove empty lines
            .trim();
        const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
${beautifiedHTML}
</body>
</html>`;
        downloadFile(fullHTML, `${sanitizeFilename(title)}.html`, 'text/html');
    };

    const exportAsMarkdown = () => {
        const turndownService = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced',
            emDelimiter: '*'
        });

        // Custom rule for handling table alignment
        turndownService.addRule('tableCell', {
            filter: ['th', 'td'],
            replacement: function(content, node) {
                const alignment = (node as HTMLElement).style.textAlign;
                if (alignment === 'center') {
                    return ` :${content}: |`;
                } else if (alignment === 'right') {
                    return ` ${content}: |`;
                }
                return ` ${content} |`;
            }
        });

        const markdown = turndownService.turndown(content);
        downloadFile(markdown, `${sanitizeFilename(title)}.md`, 'text/markdown');
    };

    const exportAsText = () => {
        // Create a temporary element to parse HTML
        const temp = document.createElement('div');
        temp.innerHTML = content;
        const text = temp.textContent || temp.innerText;
        downloadFile(text, `${sanitizeFilename(title)}.txt`, 'text/plain');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-white border rounded-md hover:bg-gray-50"
            >
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border z-50">
                    <div className="py-1">
                        <button
                            onClick={() => {
                                exportAsHTML();
                                setIsOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                        >
                            <Code className="h-4 w-4" />
                            Export as HTML
                        </button>
                        <button
                            onClick={() => {
                                exportAsMarkdown();
                                setIsOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                        >
                            <FileText className="h-4 w-4" />
                            Export as Markdown
                        </button>
                        <button
                            onClick={() => {
                                exportAsText();
                                setIsOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                        >
                            <File className="h-4 w-4" />
                            Export as Text
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExportMenu;