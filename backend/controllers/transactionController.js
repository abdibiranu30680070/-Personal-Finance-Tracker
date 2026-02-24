const transactionService = require('../services/transactionService');

const getAll = async (req, res) => {
    try {
        const transactions = await transactionService.getAllTransactions(req.user.id);
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const transaction = await transactionService.createTransaction(req.user.id, req.body);
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const transaction = await transactionService.updateTransaction(req.params.id, req.user.id, req.body);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found or unauthorized' });
        }
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        const transaction = await transactionService.deleteTransaction(req.params.id, req.user.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found or unauthorized' });
        }
        res.json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAll,
    create,
    update,
    remove
};
