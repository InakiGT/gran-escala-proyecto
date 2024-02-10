import express from 'express';
import cors from 'cors';

import routerApi from './router';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

routerApi(app);

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});