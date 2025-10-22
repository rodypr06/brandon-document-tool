# Brandon Document Tools

**Analyze documents with clarity and precision.**

A modern web application that streamlines document analysis using Claude AI. Upload PDFs, Word documents, or text files and get instant insights with a beautiful glassmorphic interface.

## Features

- 📄 **Smart Analysis** - Extract key information from PDFs, Word docs, and text files
- 🎨 **Beautiful Interface** - Clean glassmorphic UI with dark backgrounds and cyan accents
- ⚡ **Fast Processing** - Get results in seconds using Claude AI
- 📊 **Multiple Analysis Types** - Choose from general analysis, summaries, key points, insights, or questions

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **AI Analysis:** Claude API (Anthropic)
- **Deployment:** Docker + Docker Compose

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key ([get one here](https://console.anthropic.com/))

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/brandon-document-tools.git
   cd brandon-document-tools
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

3. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd client && npm install && cd ..
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server at http://localhost:3001
   - Frontend dev server at http://localhost:5173

### Docker Deployment

1. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your ANTHROPIC_API_KEY to .env
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   Open http://localhost:3001

## Usage

1. **Upload a Document**
   - Drag and drop or click to select a file
   - Supported formats: PDF, Word (.doc, .docx), Text (.txt)
   - Maximum file size: 10MB

2. **Choose Analysis Type**
   - **General Analysis**: Comprehensive summary and insights
   - **Summary**: Concise overview
   - **Key Points**: Extract main points
   - **Deep Insights**: Patterns and implications
   - **Questions**: Generate discussion questions

3. **Review Results**
   - View AI-generated analysis
   - Copy results to clipboard
   - Upload another document

## Project Structure

```
brandon-document-tools/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Tailwind styles
│   └── package.json
├── server/                 # Express backend
│   ├── routes/            # API routes
│   ├── services/          # Claude API integration
│   ├── utils/             # Document parsers
│   └── index.js           # Server entry point
├── uploads/               # Uploaded files (gitignored)
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## API Endpoints

- `POST /api/upload` - Upload a document
- `POST /api/analyze` - Analyze uploaded document
- `DELETE /api/upload/:filename` - Delete uploaded file
- `GET /api/health` - Health check

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Required |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment | development |
| `MAX_FILE_SIZE` | Max upload size in bytes | 10485760 (10MB) |
| `UPLOAD_DIR` | Upload directory | uploads |

## Development Scripts

```bash
# Run both frontend and backend in dev mode
npm run dev

# Run backend only
npm run server:dev

# Run frontend only
npm run client:dev

# Build frontend for production
npm run build

# Start production server
npm start
```

## Docker Commands

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop and remove containers
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

## Design System

### Color Palette

- **Charcoal**: `#1C1C1E` - Primary background
- **Deep Gray**: `#2B2B2E` - Secondary background
- **Cyan**: `#00FFFF` - Primary accent
- **Electric Blue**: `#007BFF` - Secondary accent
- **White Smoke**: `#F5F5F7` - Text color

### Typography

- **Fonts**: Inter, Poppins
- **Style**: Clean, modern sans-serif

### UI Components

- Rounded corners: 12-16px
- Glassmorphism effects with backdrop blur
- Cyan highlights for active states
- Smooth transitions and animations

## Contributing

This is a personal project, but feedback and suggestions are welcome. Feel free to open an issue or submit a pull request.

## License

MIT License - Use it, modify it, own it.

## Acknowledgments

- Built with [Claude AI](https://www.anthropic.com/) by Anthropic
- UI inspired by glassmorphism design trends
- Icons from [Heroicons](https://heroicons.com/)

---

**Built with care by Brandon**
