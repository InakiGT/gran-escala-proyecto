import { CreateCua, UpdateCua } from '../models/Cua';
import { CreateUser, UpdateUser } from '../models/User';
import { ServiceStrategy } from './service.strategy';

export class Service {
    constructor(private strategy: ServiceStrategy) {}

    SetStrategy(strategy: ServiceStrategy): void {
        this.strategy = strategy;
    }

    async Get() {
        return this.strategy.Get();
    }

    async GetById(id: number) {
        return this.strategy.GetById(id);
    }

    async Insert(obj: CreateCua | CreateUser) {
        return this.strategy.Insert(obj);
    }

    async Update(id: number, obj: UpdateCua | UpdateUser) {
        return this.strategy.Update(id, obj);
    }

    async Delete(id: number, userId?: number) {
        return this.strategy.Delete(id, userId);
    }
}