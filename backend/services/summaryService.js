const db = require('../db');

const getFinancialSummary = async (userId) => {
    // Total income, total expenses for specific user
    const totalsResult = await db.query(`
      SELECT 
        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expenses
      FROM transactions
      WHERE user_id = $1
    `, [userId]);

    const totals = totalsResult.rows[0];
    const total_income = parseFloat(totals.total_income || 0);
    const total_expenses = parseFloat(totals.total_expenses || 0);
    const balance = total_income - total_expenses;

    // Totals grouped by category for specific user
    const categoryTotalsResult = await db.query(`
      SELECT category, type, SUM(amount) as total
      FROM transactions
      WHERE user_id = $1
      GROUP BY category, type
    `, [userId]);

    return {
        total_income,
        total_expenses,
        balance,
        category_totals: categoryTotalsResult.rows.map(row => ({
            ...row,
            total: parseFloat(row.total)
        }))
    };
};

module.exports = {
    getFinancialSummary
};
