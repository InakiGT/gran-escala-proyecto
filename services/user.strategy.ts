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
            await this.db.dbConn.connect();
            const data = await this.db.dbConn.query('SELECT * FROM users');

            return data.rows;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }
    
    async GetById(id: number) {
        try {
            await this.db.dbConn.connect();
            const data = await this.db.dbConn.query('SELECT * FROM users WHERE id = $1', [ id ]);

            return data.rows;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }
    
    async GetByUsername(username: string) {
        try {
            await this.db.dbConn.connect();
            const data = await this.db.dbConn.query('SELECT * FROM users WHERE username = $1', [ username ]);

            return data.rows;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async Insert(obj: CreateUser) {
        try {
            await this.db.dbConn.connect();
            const data = await this.db.dbConn.query('INSERT INTO users (username, password, imgUrl) VALUES ($1, $2, $3)', [ obj.username, obj.password, obj.username ]);
            
            return data.rows;
        } catch(err) {
            throw new Error(`Error en la inserción: ${err}`);
        }
    }

    async Update(id: number, obj: UpdateUser) {
        try {
            await this.db.dbConn.connect();
            const data = await this.db.dbConn.query('UPDATE users SET username = $1, password = $2, imgUrl = $3 WHERE id = $4', [ obj.username, obj.password, obj.username, id ]);
            
            return data.rows;
        } catch(err) {
            throw new Error(`Error en la actualización: ${err}`);
        }
    }

    async Delete(id: number) {
        try {
            await this.db.dbConn.connect();
            await this.db.dbConn.query('DELETE FROM users WHERE id = $1', [ id ]);
            
            return;
        } catch(err) {
            throw new Error(`Error en la eliminación: ${err}`);
        }
    }
}