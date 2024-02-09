import { ServiceStrategy } from './service.strategy';
import { CreateUser, UpdateUser } from '../models/User';
import { Database } from '../database';
import { ConnObj } from '../models/ConnObj';


export default class UserStrategy implements ServiceStrategy {
    private db: Database;

    constructor(conObj: ConnObj) {
        this.db = Database.getInstance(conObj);
    }

    async Get() {
        try {
            const data = await this.db.dbConn.query('SELECT * FROM users');
            return data;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async GetById(id: number) {
        try {
            const data = await this.db.dbConn.query('SELECT * FROM users WHERE id = ?', [ id ]);
            return data;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async Insert(obj: CreateUser) {
        try {
            const data = await this.db.dbConn.query('INSERT INTO users (username, password, imgUrl) VALUES (?, ?, ?)', [ obj.username, obj.password, obj.username ]);
            return data;
        } catch(err) {
            throw new Error(`Error en la inserción: ${err}`);
        }
    }

    async Update(id: number, obj: UpdateUser) {
        try {
            const data = await this.db.dbConn.query('UPDATE users SET username = ?, password = ?, imgUrl = ? WHERE id = ?', [ obj.username, obj.password, obj.username, id ]);
            return data;
        } catch(err) {
            throw new Error(`Error en la actualización: ${err}`);
        }
    }

    async Delete(id: number) {
        try {
            await this.db.dbConn.query('DELETE FROM users WHERE id = ?', [ id ]);
            return;
        } catch(err) {
            throw new Error(`Error en la eliminación: ${err}`);
        }
    }
}