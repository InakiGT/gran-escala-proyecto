import { ServiceStrategy } from './service.strategy';
import { CreateUser, UpdateUser } from '../models/User';
import { Database } from '../database';
import { ConnObj } from '../models/ConnObj';


export default class UserStrategy implements ServiceStrategy {
    private db: Database | null;

    constructor(conObj: ConnObj) {
        this.db = null;
        this.initializeAsync(conObj);
    }

    async initializeAsync(conObj: ConnObj) {
        this.db = await Database.getInstance(conObj);
    }

    async Get() {
        try {
            const data = await this.db?.dbConn.query('SELECT * FROM users');

            return data?.rows;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }
    
    async GetById(id: number) {
        try {
            const data = await this.db?.dbConn.query('SELECT * FROM users WHERE id = $1', [ id ]);

            return data?.rows;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }
    
    async GetByUsername(username: string) {
        try {
            const data = await this.db?.dbConn.query('SELECT * FROM users WHERE username = $1', [ username ]);

            return data?.rows;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async Insert(obj: CreateUser) {
        try {
            const data = await this.db?.dbConn.query('INSERT INTO users (username, password, imageurl) VALUES ($1, $2, $3)', [ obj.username, obj.password, obj.imgUrl ]);
            
            return data?.rows;
        } catch(err) {
            throw new Error(`Error en la inserción: ${err}`);
        }
    }

    async Update(id: number, obj: UpdateUser) {
        try {
            const data = await this.db?.dbConn.query('UPDATE users SET username = $1, password = $2, imgUrl = $3 WHERE id = $4', [ obj.username, obj.password, obj.username, id ]);
            
            return data?.rows;
        } catch(err) {
            throw new Error(`Error en la actualización: ${err}`);
        }
    }

    async Delete(id: number) {
        try {
            await this.db?.dbConn.query('DELETE FROM users WHERE id = $1', [ id ]);
            
            return;
        } catch(err) {
            throw new Error(`Error en la eliminación: ${err}`);
        }
    }
}