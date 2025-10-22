import { useState, useRef } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:1988/api'

const ANALYSIS_TYPES = [
  { value: 'general', label: 'General Analysis', description: 'Comprehensive summary and insights' },
  { value: 'summary', label: 'Summary', description: 'Concise overview' },
  { value: 'keyPoints', label: 'Key Points', description: 'Extract main points' },
  { value: 'insights', label: 'Deep Insights', description: 'Patterns and implications' },
  { value: 'questions', label: 'Questions', description: 'Generate discussion questions' }
]

export default function FileUpload({ onFileUpload, onAnalysisComplete, onLoadingChange, uploadedFile }) {
  const [analysisType, setAnalysisType] = useState('general')
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file) => {
    setError(null)

    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain']
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload PDF, Word, or text files only.')
      return
    }

    // Validate file size (10MB)
    if (file.size > 10485760) {
      setError('File too large. Maximum size is 10MB.')
      return
    }

    const formData = new FormData()
    formData.append('document', file)

    try {
      onLoadingChange(true)
      const uploadResponse = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      onFileUpload(uploadResponse.data.file)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload file')
      onLoadingChange(false)
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedFile) {
      setError('Please upload a file first')
      return
    }

    setError(null)
    onLoadingChange(true)
    onAnalysisComplete(null)

    try {
      const response = await axios.post(`${API_URL}/analyze`, {
        filename: uploadedFile.filename,
        analysisType: analysisType
      })

      onAnalysisComplete(response.data.analysis)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze document')
      onAnalysisComplete(null)
    } finally {
      onLoadingChange(false)
    }
  }

  const handleReset = () => {
    onFileUpload(null)
    onAnalysisComplete(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="glass-card p-8 space-y-6">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-cyan bg-cyan/10'
            : uploadedFile
            ? 'border-electric-blue/50 bg-electric-blue/5'
            : 'border-white/20 hover:border-white/40'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleChange}
        />

        {!uploadedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-cyan/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-white-smoke/90 font-medium mb-1">Drop your document here</p>
              <p className="text-white-smoke/50 text-sm">PDF, Word, or Text files (max 10MB)</p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="glass-button"
            >
              Choose File
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-electric-blue/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-white-smoke font-medium">{uploadedFile.originalname}</p>
              <p className="text-white-smoke/50 text-sm">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <button onClick={handleReset} className="text-cyan hover:text-cyan/80 text-sm transition-colors">
              Upload Different File
            </button>
          </div>
        )}
      </div>

      {/* Analysis Type Selection */}
      {uploadedFile && (
        <div className="space-y-4">
          <label className="block text-white-smoke font-medium">Analysis Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ANALYSIS_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => setAnalysisType(type.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  analysisType === type.value
                    ? 'border-cyan bg-cyan/10'
                    : 'border-white/10 hover:border-white/30 bg-deep-gray/20'
                }`}
              >
                <div className="font-medium text-white-smoke">{type.label}</div>
                <div className="text-xs text-white-smoke/60 mt-1">{type.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Analyze Button */}
      {uploadedFile && (
        <button
          onClick={handleAnalyze}
          className="w-full glass-button py-4 text-lg font-semibold"
        >
          Analyze Document
        </button>
      )}
    </div>
  )
}
