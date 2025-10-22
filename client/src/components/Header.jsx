export default function Header() {
  return (
    <header className="glass-card mx-4 mt-4 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-electric-blue flex items-center justify-center">
            <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gradient">Brandon Document Tools</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-white-smoke/70 hover:text-cyan transition-colors">Features</a>
          <a href="#" className="text-white-smoke/70 hover:text-cyan transition-colors">About</a>
          <a href="#" className="glass-button text-sm py-2">Get Started</a>
        </nav>
      </div>
    </header>
  )
}
