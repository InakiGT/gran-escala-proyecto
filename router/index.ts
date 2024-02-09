import { Router, Express } from "express";

import cuaRouter from './cua.router';

const router: Router = Router();

const routerApi = ( app: Express ) => {
    app.use('/api/v1', router);

    router.use('/cua', cuaRouter);
}

export default routerApi;