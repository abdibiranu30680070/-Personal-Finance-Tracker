const request = require('supertest');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Create a mock app for testing health check
const app = express();
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date(), uptime: process.uptime() });
});

describe('GET /health', () => {
    it('should return 200 OK and status ok', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('ok');
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body).toHaveProperty('uptime');
    });
});
