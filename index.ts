import express from 'express';

import routerApi from './router';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

routerApi(app);

app.listen(() => {
    console.log(`App listening on port: ${port}`);
});