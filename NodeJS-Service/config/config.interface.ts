export interface ConfigSchema {
    environment: string;
    server: {
        port: number;
        host: string;
    };
    database: {
        uri: string;
    };
}
