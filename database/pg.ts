import { Client } from 'pg';
import { BaseDatabase, DatabaseFactory } from './database.factory';
import { ConnObj } from '../models/ConnObj';

class Postgres implements BaseDatabase {
    constructor(private connObj: ConnObj) {}

    ConnectDB(): Client {
        return new Client(this.connObj);
    }
}

export class PostgresFactory implements DatabaseFactory {
    makeDatabase(connObj: ConnObj): BaseDatabase {
        return new Postgres(connObj);
    }
}