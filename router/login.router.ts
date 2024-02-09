import { Router } from "express";
import Login from '../services/login.service';


const router = Router();
const service = new Login();

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        const jwt = await service.Login(username, password);
        
        res.json(200).json({
            jwt,
        });
    } catch(err) {
        res.status(405).json({  });
    }
});

export default router;