import { Connection, createConnection } from "mysql";
import { BaseDatabase, DatabaseFactory } from "./database.factory";
import { ConnObj } from "../models/ConnObj";

class MySql implements BaseDatabase {
    constructor(private connObj: ConnObj) {}

    ConnectDB(): Connection {
        return createConnection(this.connObj);
    }
}

export class MySqlFactory implements DatabaseFactory {
    makeDatabase(connObj: ConnObj): BaseDatabase {
        return new MySql(connObj);
    }
}