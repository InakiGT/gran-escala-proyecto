import { Connection } from 'mysql2';
import { MySqlFactory } from './mysql';
import { ConnObj } from '../models/ConnObj';

export class LogsDatabase {
    private connection: Connection;

    constructor(connObj: ConnObj) {
        const Factory = new MySqlFactory();
        const Mysql = Factory.makeDatabase(connObj);

        this.connection = Mysql.ConnectDB();
        this.connection.connect((err) => {
            if (err !== null) {
                console.error('Error attemping to connect with Log DB: ', err);
                return;
            }
            console.log('Log DB Connected!');
        });
    }

    CreateLog(message: string) {
        let status = 0;
        let err = null;
        const values = [ 'INFO', message, 'Main Server', 1 ];
        
        this.connection.query('INSERT INTO logs (severity, message, source, user_id) VALUES (?, ?, ?, ?)', values, (error) => {
            if (error !== null) {
                status = 1;
                err = error;
            }
        });
        
        this.connection.end();
        return {
            status,
            err,
        };
    }
}