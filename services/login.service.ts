import UserStrategy from "./user.strategy";
import jwt from 'jsonwebtoken';

export default class Login {
    private UserService: UserStrategy;

    constructor() {
        this.UserService = new UserStrategy({
            user: 'mini',
            password: 'pass',
            port: 5432,
            host: 'localhost',
            database: 'mini-x',
        });
    }

    async Login(username: string, password: string) {
        const data = await this.UserService.GetByUsername(username);
        const pass = data[0].password;
        
        if (pass == password) {
            return jwt.sign(username, 'secret');
        } else {
            throw new Error('No Authorizated');
        }
    }
}