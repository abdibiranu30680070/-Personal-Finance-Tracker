const reportService = require('../services/reportService');

const save = async (req, res) => {
    const { pdfData, fileName } = req.body;

    if (!pdfData) {
        return res.status(400).json({ error: 'No PDF data provided' });
    }

    try {
        const filePath = await reportService.saveReportToRoot(pdfData, fileName);
        res.json({
            message: 'Report saved successfully to root folder',
            path: filePath
        });
    } catch (err) {
        console.error('Error saving PDF:', err);
        res.status(500).json({ error: 'Failed to save PDF to server' });
    }
};

module.exports = {
    save
};
