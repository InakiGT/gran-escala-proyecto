import { ServiceStrategy } from './service.strategy';
import { CreateCua, UpdateCua } from '../models/Cua';
import { CreateUser, UpdateUser } from '../models/User';


export default class UserStrategy implements ServiceStrategy {
    Get() {

    }

    GetById(id: number) {
        
    }

    Insert(obj: CreateCua | CreateUser) {
        
    }

    Update(id: number, obj: UpdateCua | UpdateUser) {
        
    }

    Delete(id: number) {
        
    }
}