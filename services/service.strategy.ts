import { CreateCua, UpdateCua } from '../models/Cua';
import { CreateUser, UpdateUser } from '../models/User';

export interface ServiceStrategy {
    Get(): any;
    GetById(id: number): any;
    Insert(obj: CreateCua | CreateUser): any;
    Update(id: number, obj: UpdateCua | UpdateUser): any;
    Delete(id: number): any;
}