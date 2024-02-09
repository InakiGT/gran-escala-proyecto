import { Connection, createConnection } from 'mysql';
import { Client } from 'pg';

export class Database {
    private static instance: Database;
    public dbConn: Connection | Client;

    private constructor(
        dbEngine: string, 
        user: string, 
        host: string, 
        database: string, 
        password: string, 
        port: number) 
    {
        const connObj = {
            user,
            host,
            database,
            password,
            port,
        }

        if (dbEngine == 'mysql') {
            this.dbConn = createConnection(connObj);
        } else {
            this.dbConn = new Client(connObj);
        }
    }

    static getInstance(
        dbEngine: string, 
        user: string, 
        host: string, 
        database: string, 
        password: string, 
        port: number): Database 
    {
        if (!Database.instance) {
            Database.instance = new Database(dbEngine, user, host, database, password, port);
        } 

        return Database.instance;
    }
}