import { Router, Express } from "express";

import loginRouter from './login.router';
import createRouter from "./abstract.router";
import { Strategies } from "../models/Strategies";

const router: Router = Router();

const routerApi = ( app: Express ) => {
    app.use('/api/v1', router);

    router.use('/cua', createRouter(Strategies.CuaStrategy));
    router.use('/user', createRouter(Strategies.UserStrategy));
    router.use('/login', loginRouter);
}

export default routerApi;