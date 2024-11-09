import axios from 'axios';
import { User } from '@/types/user';
import { Document } from '@/types/document';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const documentService = {
    async getDocument(id: string): Promise<Document> {
        const response = await api.get(`/documents/${id}`);
        return response.data;
    },

    async createDocument(document: Partial<Document>): Promise<Document> {
        const response = await api.post('/documents', document);
        return response.data;
    },

    async updateDocument(id: string | undefined, document: Partial<Document>): Promise<Document> {
        const response = await api.put(`/documents/${id}`, document);
        return response.data;
    },

    async deleteDocument(id: string): Promise<void> {
        await api.delete(`/documents/${id}`);
    },
};

export const authService = {
    async login(username: string, password: string): Promise<User> {
        const response = await api.get(`/users?username=${username}&password=${password}`);
        if (response.data.length === 0) {
            throw new Error('Invalid credentials');
        }
        return response.data[0];
    },
};