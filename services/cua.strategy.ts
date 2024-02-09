import { Database } from '../database';
import { ConnObj } from '../models/ConnObj';
import { CreateCua, UpdateCua } from '../models/Cua';
import { ServiceStrategy } from './service.strategy';

export default class CuaStrategy implements ServiceStrategy {
    private db: Database;

    constructor(conObj: ConnObj) {
        this.db = Database.getInstance(conObj);
    }

    async Get() {
        try {
            const data = await this.db.dbConn.query('SELECT * FROM cuas');
            return data;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async GetById(id: number) {
        try {
            const data = await this.db.dbConn.query('SELECT * FROM cuas WHERE id = ?', [ id ]);
            return data;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async Insert(obj: CreateCua) {
        try {
            const data = await this.db.dbConn.query('INSERT INTO cuas (title, content, author, imageUrl) VALUES (?, ?, ?, ?)', [ obj.title, obj.content, obj.author, obj.imgUrl ]);
            return data;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async Update(id: number, obj: UpdateCua) {
        try {
            const data = await this.db.dbConn.query('UPDATE cuas SET title = ?, content = ?, imageUrl = ? WHERE id = ? ', [ obj.title, obj.content, obj.imgUrl, id ]);
            return data;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async Delete(id: number) {
        try {
            const data = await this.db.dbConn.query('DELETE FROM cuas WHERE id = ?', [ id] );
            return data;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }
}