import { ConnObj } from '../models/ConnObj';

export interface BaseDatabase {
    ConnectDB(): any;
}

export interface DatabaseFactory {
    makeDatabase(connObj: ConnObj): BaseDatabase;
}