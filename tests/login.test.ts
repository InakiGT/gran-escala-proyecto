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
            // Arrange
            const username = 'testUser';
            const password = 'pass';

            // Act
            const jwt = await service.Login(username, password);

            // Assert
            expect(jwt).not.toEqual("");
        });
    });

    describe('Test for Login method with wrong password', () => {
        test('Should return an Error', async () => {
            // Arrange
            const username = 'testUser';
            const password = 'wring';

            try {
                // Act
                await service.Login(username, password);
            } catch(err) {
                // Assert
                expect((err as Error).message).toBe('Unauthorized');
            }
        });
    });

    describe('Test for Login method with wrong username', () => {
        test('Should return an Error', async () => {
            // Arrange
            const username = 'user';
            const password = 'pass';

            try {
                // Act
                await service.Login(username, password)
            } catch(err) {
                // Assert
                expect((err as Error).message).toBe('Unauthorized');
            }
        });
    });
});