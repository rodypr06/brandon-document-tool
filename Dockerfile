# Build stage for client
FROM node:18-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy backend package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy backend source code
COPY server/ ./server/

# Copy built client files
COPY --from=client-builder /app/client/dist ./client/dist

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 3001

# Environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Start server
CMD ["node", "server/index.js"]
