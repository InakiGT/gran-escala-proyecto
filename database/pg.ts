import { Client } from 'pg';
import { BaseDatabase, DatabaseFactory } from './database.factory';

class Postgres implements BaseDatabase {
    constructor(private connObj: any) {}

    ConnectDB(): Client {
        return new Client(this.connObj);
    }
}

export class PostgresFactory implements DatabaseFactory {
    makeDatabase(connObj: any): BaseDatabase {
        return new Postgres(connObj);
    }
}