const fs = require('fs').promises;
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

async function extractText(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  try {
    switch (ext) {
      case '.pdf':
        return await extractFromPDF(filePath);

      case '.docx':
      case '.doc':
        return await extractFromWord(filePath);

      case '.txt':
        return await extractFromText(filePath);

      default:
        throw new Error(`Unsupported file type: ${ext}`);
    }
  } catch (error) {
    throw new Error(`Failed to extract text from ${ext} file: ${error.message}`);
  }
}

async function extractFromPDF(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
}

async function extractFromWord(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

async function extractFromText(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  return content;
}

module.exports = {
  extractText
};
