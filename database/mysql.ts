import { Connection, createConnection } from "mysql";
import { BaseDatabase, DatabaseFactory } from "./database.factory";

class MySql implements BaseDatabase {
    constructor(private connObj: any) {}

    ConnectDB(): Connection {
        return createConnection(this.connObj);
    }
}

export class MySqlFactory implements DatabaseFactory {
    makeDatabase(connObj: any): BaseDatabase {
        return new MySql(connObj);
    }
}