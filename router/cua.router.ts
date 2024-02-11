import { Router } from 'express';

import { Service } from '../services/service';
import CuaStrategy from '../services/cua.strategy';
import { CreateCua, UpdateCua } from '../models/Cua';

const router: Router = Router();
const cuaStrategy = new CuaStrategy({
    user: 'mini',
    password: 'pass',
    port: 5432,
    host: 'localhost',
    database: 'mini-x',
});
const service = new Service(cuaStrategy);

router.get('/', async (_, res) => {
    try {
        const data = await service.Get();
        res.status(200).json(data.reverse());
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
        const body: CreateCua = req.body;

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
        const body: UpdateCua = req.body;

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

export default router;