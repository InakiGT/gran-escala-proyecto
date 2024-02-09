import { Router } from "express";
import UserStrategy from "../services/user.strategy";
import { Service } from "../services/service";
import { CreateUser, UpdateUser } from "../models/User";

const router: Router = Router();
const userStrategy = new UserStrategy({
    user: 'cua',
    password: '',
    port: 1234,
    host: '',
    database: '',
});
const service = new Service(userStrategy);

router.get('/', async (_, res) => {
    try {
        const data = await service.Get();
        res.status(200).json(data);
    } catch(err) {
        console.error(err);
        res.status(500).json({});
    }
});

router.post('/', async (req, res) => {
    try {
        const body: CreateUser = req.body;

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
        const body: UpdateUser = req.body;

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

        const data = await service.Delete(id);
        res.status(200).json(data);
    } catch(err) {
        console.error(err);
        res.status(500).json({});
    }
});

export default router;