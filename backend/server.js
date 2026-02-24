const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');
const summaryRoutes = require('./routes/summary');
const profileRoutes = require('./routes/profile');
const reportRoutes = require('./routes/reports');

const app = express();
const PORT = process.env.PORT || 5000;

// Startup Checks
console.log('--- Startup Configuration ---');
console.log('PORT:', PORT);
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configured (Masked)' : 'NOT CONFIGURED');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Configured (Masked)' : 'NOT CONFIGURED');
console.log('-----------------------------');

// Middleware
app.use(cors({
    origin: ['https://personal-finance-tracker-two-beta.vercel.app', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date(), uptime: process.uptime() });
});
app.use('/api/transactions', transactionRoutes);
app.use('/api/summary', summaryRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/reports', reportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// start listening only if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
