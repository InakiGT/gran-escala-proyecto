import { Router } from 'express';

import CuaStrategy from '../services/cua.strategy';
import UserStrategy from '../services/user.strategy';
import { CreateCua, UpdateCua } from '../models/Cua';
import { CreateUser, UpdateUser } from '../models/User';
import { ServiceStrategy } from '../services/service.strategy';
import { Strategies } from '../models/Strategies';


const createRouter = (strategy: Strategies): Router => {
    const router = Router();

    const CurrentStrategy = {
        cuaStrategy: CuaStrategy,
        userStrategy: UserStrategy,
    }

    const service: ServiceStrategy = new CurrentStrategy[strategy]({
        user: 'mini',
        password: 'pass',
        port: 5432,
        host: 'localhost',
        database: 'mini-x',
    });

    router.get('/', async (_, res) => {
        try {
            const data = await service.Get();
            res.status(200).json(data?.reverse());
        } catch(err) {
            console.error(err);
            res.status(500).json({});
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);

            const data = await service.GetById(id);
            res.status(200).json(data[0]);
        } catch(err) {
            console.error(err);
            res.status(500).json({});
        }
    });

    router.post('/', async (req, res) => {
        try {
            const body: CreateCua | CreateUser = req.body;

            const data = await service.Insert(body);
            res.status(201).json(data);
        } catch(err) {
            console.error(err);
            res.status(500).json({});
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const body: UpdateCua | UpdateUser = req.body;

            const data = await service.Update(id, body);
            res.status(200).json(data);
        } catch(err) {
            console.error(err);
            res.status(500).json({});
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const userId = req.body.author;

            const data = await service.Delete(id, userId);
            res.status(200).json(data);
        } catch(err) {
            console.error(err);
            res.status(500).json({});
        }
    });

    return router;
}


export default createRouter;