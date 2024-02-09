import { Client } from 'pg';
import { Connection } from 'mysql';

export interface BaseDatabase {
    ConnectDB(): Client | Connection;
}

export interface DatabaseFactory {
    makeDatabase(connObj: any): BaseDatabase;
}