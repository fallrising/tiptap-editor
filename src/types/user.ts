export interface User {
    id: string;
    username: string;
    role: 'admin' | 'user';
    permissions: string[];
}