export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan border-r-electric-blue animate-spin"></div>
      </div>
      <div className="text-center">
        <p className="text-white-smoke font-medium">Analyzing document...</p>
        <p className="text-white-smoke/50 text-sm mt-1">This may take a few moments</p>
      </div>
    </div>
  )
}
