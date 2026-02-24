const summaryService = require('../services/summaryService');

const getSummary = async (req, res) => {
    try {
        const summary = await summaryService.getFinancialSummary(req.user.id);
        res.json(summary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getSummary
};
