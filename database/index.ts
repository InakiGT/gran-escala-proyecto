import { Connection, createConnection } from 'mysql';
import { Client } from 'pg';
import { MySqlFactory } from './mysql';
import { PostgresFactory } from './pg';

export class Database {
    private static instance: Database;
    public dbConn: Connection | Client;

    private constructor(
        type: 'pg' | 'mysql', 
        user: string, 
        host: string, 
        database: string, 
        password: string, 
        port: number
    ) {
        const connObj = {
            user,
            host,
            database,
            password,
            port,
        }

        const factories = {
            mysql: MySqlFactory,
            pg: PostgresFactory,
        }
            
        const Factory = factories[type];
        const dbFact = new Factory();
        const db = dbFact.makeDatabase(connObj);
        this.dbConn = db.ConnectDB();
    }

    static getInstance(
        type: 'pg' | 'mysql', 
        user: string, 
        host: string, 
        database: string, 
        password: string, 
        port: number): Database 
    {
        if (!Database.instance) {
            Database.instance = new Database(type, user, host, database, password, port);
        } 

        return Database.instance;
    }
}