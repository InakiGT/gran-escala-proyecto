import { Router, Express } from "express";

import cuaRouter from './cua.router';
import userRouter from './user.router';
import loginRouter from './login.router';

const router: Router = Router();

const routerApi = ( app: Express ) => {
    app.use('/api/v1', router);

    router.use('/cua', cuaRouter);
    router.use('/user', userRouter);
    router.use('/login', loginRouter);
}

export default routerApi;