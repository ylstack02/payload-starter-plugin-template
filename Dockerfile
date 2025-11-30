# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build plugin and Next.js app
RUN pnpm build
RUN pnpm run dev:generate-importmap || true

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files from builder
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dev/.next ./dev/.next
COPY --from=builder /app/dev/public ./dev/public

# Copy necessary dev files
COPY dev/payload.config.ts ./dev/
COPY dev/seed.ts ./dev/
COPY dev/next.config.mjs ./dev/

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the Next.js app
CMD ["pnpm", "dev"]
