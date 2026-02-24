const request = require('supertest');
const app = require('../server');
const db = require('../db');

// generate a unique email for each test run so we don't conflict with existing data
const randomEmail = () => `testuser_${Date.now()}@example.com`;

describe('Auth endpoints', () => {
    let email;
    const password = 'testpass123';
    const name = 'Test User';

    afterAll(async () => {
        // clean up any users created by the tests
        if (email) {
            await db.query('DELETE FROM users WHERE email = $1', [email]);
        }
        db.pool && db.pool.end();
    });

    it('should register a new user', async () => {
        email = randomEmail();
        const res = await request(app)
            .post('/api/profile/register')
            .send({ name, email, password });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('user');
        expect(res.body.user.email).toBe(email);
        expect(res.body).toHaveProperty('token');
    });

    it('should not register same email twice', async () => {
        const res = await request(app)
            .post('/api/profile/register')
            .send({ name, email, password });
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('error');
    });

    it('should log in with correct credentials', async () => {
        const res = await request(app)
            .post('/api/profile/login')
            .send({ email, password });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body).toHaveProperty('token');
    });

    it('should fail login with wrong password', async () => {
        const res = await request(app)
            .post('/api/profile/login')
            .send({ email, password: 'wrongpass' });
        expect(res.status).toBe(401);
    });

    it('should fail login for unknown email', async () => {
        const res = await request(app)
            .post('/api/profile/login')
            .send({ email: 'nonexistent@example.com', password: 'anything' });
        expect(res.status).toBe(401);
    });
});
