export interface DocumentVersion {
    id: string;
    documentId: string;
    content: string;
    title: string;
    version: number;
    createdAt: string;
    createdBy: string;
    changeDescription?: string;
}