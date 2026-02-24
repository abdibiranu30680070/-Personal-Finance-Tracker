const db = require('../db');

const getAllTransactions = async (userId) => {
    const result = await db.query(
        'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
        [userId]
    );
    return result.rows;
};

const createTransaction = async (userId, data) => {
    const { amount, type, category, description, date } = data;
    const result = await db.query(
        'INSERT INTO transactions (user_id, amount, type, category, description, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [userId, amount, type, category, description, date || new Date()]
    );
    return result.rows[0];
};

const updateTransaction = async (transactionId, userId, data) => {
    const { amount, type, category, description, date } = data;
    const result = await db.query(
        'UPDATE transactions SET amount = $1, type = $2, category = $3, description = $4, date = $5 WHERE id = $6 AND user_id = $7 RETURNING *',
        [amount, type, category, description, date, transactionId, userId]
    );
    return result.rows[0];
};

const deleteTransaction = async (transactionId, userId) => {
    const result = await db.query(
        'DELETE FROM transactions WHERE id = $1 AND user_id = $2 RETURNING *',
        [transactionId, userId]
    );
    return result.rows[0];
};

module.exports = {
    getAllTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
};
