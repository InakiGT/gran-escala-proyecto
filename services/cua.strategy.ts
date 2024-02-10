import { Database } from '../database';
import { ConnObj } from '../models/ConnObj';
import { CreateCua, UpdateCua } from '../models/Cua';
import { ServiceStrategy } from './service.strategy';

export default class CuaStrategy implements ServiceStrategy {
    private db: Database | null;

    constructor(connObj: ConnObj) {
        this.db = null;
        this.initializeAsync(connObj);
    }

    async initializeAsync(connObj: ConnObj) {
        this.db = await Database.getInstance(connObj);
    }

    async Get() {
        try {
            const data = await this.db?.dbConn.query('SELECT * FROM cuas');


            return data?.rows;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async GetById(id: number) {
        try {
            const data = await this.db?.dbConn.query('SELECT * FROM cuas WHERE id = $1', [ id ]);


            return data?.rows;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async Insert(obj: CreateCua) {
        try {
            const data = await this.db?.dbConn.query('INSERT INTO cuas (title, content, author, imageUrl) VALUES ($1, $2, $3, $4)', [ obj.title, obj.content, obj.author, obj.imgUrl ]);

            return data?.rows;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async Update(id: number, obj: UpdateCua) {
        try {
            const tmp = (await this.db?.dbConn.query('SELECT author FROM cuas WHERE id = $1', [ id ]))?.rows;

            if (tmp !== undefined && obj.author == tmp[0].author) {
                const data = await this.db?.dbConn.query('UPDATE cuas SET title = $1, content = $2, imageUrl = $3 WHERE id = $4', [ obj.title, obj.content, obj.imgUrl, id ]);
                return data;
            }

            return null;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async Delete(id: number, userId: number) {
        try {
            const tmp = (await this.db?.dbConn.query('SELECT author FROM cuas WHERE id = $1', [ id ]))?.rows;

            if (tmp !== undefined && userId == tmp[0].author) {
                const data = await this.db?.dbConn.query('DELETE FROM cuas WHERE id = $1', [ id] );
                return data;
            }

            return null;
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }
}