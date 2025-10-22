const express = require('express');
const path = require('path');
const fs = require('fs');
const { analyzeDocument } = require('../services/claude');
const { extractText } = require('../utils/documentParser');

const router = express.Router();

// Analyze document endpoint
router.post('/', async (req, res) => {
  try {
    const { filename, analysisType } = req.body;

    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    const filePath = path.join(__dirname, '..', '..', process.env.UPLOAD_DIR || 'uploads', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Extract text from document
    const documentText = await extractText(filePath);

    // Analyze with Claude
    const analysis = await analyzeDocument(documentText, analysisType || 'general');

    res.json({
      success: true,
      analysis: analysis,
      metadata: {
        filename: filename,
        analysisType: analysisType || 'general',
        textLength: documentText.length
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
