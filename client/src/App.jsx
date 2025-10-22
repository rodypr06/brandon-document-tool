import { useState } from 'react'
import Header from './components/Header'
import FileUpload from './components/FileUpload'
import AnalysisResults from './components/AnalysisResults'

function App() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-deep-gray to-charcoal">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="glow-text">Document Analysis</span>
            </h1>
            <p className="text-white-smoke/60 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              Analyze documents with clarity and precision. Upload your file, choose your analysis type, and get instant insights.
            </p>
          </div>

          {/* Upload Section */}
          <FileUpload
            onFileUpload={setUploadedFile}
            onAnalysisComplete={setAnalysis}
            onLoadingChange={setLoading}
            uploadedFile={uploadedFile}
          />

          {/* Results Section */}
          {(analysis || loading) && (
            <AnalysisResults
              analysis={analysis}
              loading={loading}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white-smoke/50 text-sm">
            Built with care by Brandon · Powered by Claude AI
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
