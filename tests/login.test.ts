import LoginService from '../services/login.service';
import { User } from '../models/User';

const fakeUsers: [ User ] = [
    {
        id: 1,
        username: 'testUser',
        password: 'pass',
        imgUrl: '',
    },
];

class UserStrategyStub {
    constructor() {
        return;
    }
    GetByUsername( username: string) {
        const data = fakeUsers.find(user => user.username === username);
        return data ? [ data ] : [ { username: '', password: '' } ];
    }  

}

jest.mock('../services/user.strategy.ts', () => jest.fn().mockImplementation(() => new UserStrategyStub()));

describe('Test for LogIn service', () => {
    let service: LoginService;

    beforeAll(() => {
        service = new LoginService();
    });

    describe('Test for Login method with correct data', () => {
        test('Should return a JWT', async () => {
            const username = 'testUser';
            const password = 'pass';

            const jwt = await service.Login(username, password);

            expect(jwt).not.toEqual("");
        });
    });

    describe('Test for Login method with wrong password', () => {
        test('Should return an Error', async () => {
            const username = 'testUser';
            const password = 'wring';

            try {
                await service.Login(username, password)
            } catch(err) {
                expect((err as Error).message).toBe('Unauthorized');
            }
        });
    });

    describe('Test for Login method with wrong username', () => {
        test('Should return an Error', async () => {
            const username = 'user';
            const password = 'pass';

            try {
                await service.Login(username, password)
            } catch(err) {
                expect((err as Error).message).toBe('Unauthorized');
            }
        });
    });
});