export interface Document {
    id: string;
    title: string;
    content: string;
    userId: string;  // Add this field
    metadata: {
        createdAt: string;
        updatedAt: string;
        createdBy: string;
        version: number;
    };
}

export interface CreateDocumentDto {
    title: string;
    content: string;
    userId: string;
    metadata: {
        createdAt: string;
        updatedAt: string;
        createdBy: string;
        version: number;
    };
}