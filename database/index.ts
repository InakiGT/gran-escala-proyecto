import { Client } from 'pg';
import { PostgresFactory } from './pg';
import { ConnObj } from '../models/ConnObj';

export class Database {
    private static instance: Database;
    public dbConn: Client;

    private constructor(connObj: ConnObj) {
        const dbFact = new PostgresFactory();
        const db = dbFact.makeDatabase(connObj);
        this.dbConn = db.ConnectDB();
    }
    
    static async connect() {
        await Database.instance.dbConn.connect();
        console.log('Main DB Connected');
    }
    
    static async getInstance(connObj: ConnObj) {
        if (!Database.instance) {
            Database.instance = new Database(connObj);
            await Database.connect();
        } 

        return Database.instance;
    }
}