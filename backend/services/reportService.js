const fs = require('fs');
const path = require('path');

const saveReportToRoot = async (pdfData, fileName) => {
    // The root folder is two levels up from this file (backend/services/reportService.js -> backend -> root)
    const rootPath = path.join(__dirname, '..', '..');
    const filePath = path.join(rootPath, fileName || `Report_${Date.now()}.pdf`);

    // Convert base64 PDF data to buffer
    const buffer = Buffer.from(pdfData.split(',')[1], 'base64');

    fs.writeFileSync(filePath, buffer);
    return filePath;
};

module.exports = {
    saveReportToRoot
};
