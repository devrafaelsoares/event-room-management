import { ServerAuthor } from './server-author';

export type ServerInfo = {
    server: {
        version: string;
        name: string;
        authors: ServerAuthor[];
        repository: string;
    };
};
