import { Database } from '../database';
import { ConnObj } from '../models/ConnObj';
import { CreateCua, UpdateCua } from '../models/Cua';
import { CreateUser, UpdateUser } from '../models/User';
import { ServiceStrategy } from './service.strategy';

export default class CuaStrategy implements ServiceStrategy {
    private db: Database;

    constructor(conObj: ConnObj) {
        this.db = Database.getInstance(conObj);
    }

    async Get() {
        try {
            const data = this.db.dbConn.query('SELECT * FROM cuas');
        } catch(err) {
            throw new Error(`Error en la consulta: ${err}`);
        }
    }

    async GetById(id: number) {
        
    }

    async Insert(obj: CreateCua | CreateUser) {
        
    }

    async Update(id: number, obj: UpdateCua | UpdateUser) {
        
    }

    async Delete(id: number) {
        
    }
}