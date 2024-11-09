import { Document } from './document';

export interface EditorProps {
    document?: Document;
    readOnly?: boolean;
    onSave?: (content: string) => Promise<void>;
}