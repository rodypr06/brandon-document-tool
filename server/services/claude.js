const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const ANALYSIS_PROMPTS = {
  general: 'Please analyze this document and provide a comprehensive summary including: 1) Main topics and themes, 2) Key points and takeaways, 3) Document structure and organization, 4) Any notable insights or patterns.',

  summary: 'Provide a concise summary of this document, highlighting the most important information and key points.',

  keyPoints: 'Extract and list the key points, main arguments, and critical information from this document in a clear, structured format.',

  insights: 'Analyze this document and provide deeper insights, patterns, connections, and implications that may not be immediately obvious.',

  questions: 'After reading this document, generate a list of insightful questions that could deepen understanding or guide further research on this topic.'
};

async function analyzeDocument(documentText, analysisType = 'general') {
  try {
    const prompt = ANALYSIS_PROMPTS[analysisType] || ANALYSIS_PROMPTS.general;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `${prompt}\n\nDocument content:\n\n${documentText}`
        }
      ]
    });

    return {
      content: message.content[0].text,
      type: analysisType,
      model: message.model,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens
      }
    };
  } catch (error) {
    console.error('Claude API error:', error);
    throw new Error(`Failed to analyze document: ${error.message}`);
  }
}

module.exports = {
  analyzeDocument
};
