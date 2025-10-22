import LoadingSpinner from './LoadingSpinner'

export default function AnalysisResults({ analysis, loading }) {
  if (loading) {
    return (
      <div className="glass-card p-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (!analysis) return null

  return (
    <div className="glass-card p-8 space-y-6 animate-float">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gradient">Analysis Results</h2>
          <p className="text-white-smoke/60 text-sm mt-1">
            {analysis.type.charAt(0).toUpperCase() + analysis.type.slice(1)} Analysis
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-white-smoke/70">Completed</span>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <div className="text-white-smoke/90 leading-relaxed whitespace-pre-wrap">
          {analysis.content}
        </div>
      </div>

      {/* Metadata */}
      {analysis.usage && (
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white-smoke/50">
          <div className="flex items-center space-x-4">
            <span>Model: {analysis.model}</span>
            <span>•</span>
            <span>Tokens: {analysis.usage.inputTokens + analysis.usage.outputTokens}</span>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(analysis.content)
            }}
            className="text-cyan hover:text-cyan/80 transition-colors flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy</span>
          </button>
        </div>
      )}
    </div>
  )
}
