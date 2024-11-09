export interface Document {
    id?: string;
    title: string;
    content: string;
    metadata: {
        createdAt: string;
        updatedAt: string;
        createdBy: string;
        version: number;
    };
}