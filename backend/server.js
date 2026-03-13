const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');
const summaryRoutes = require('./routes/summary');
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);

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
