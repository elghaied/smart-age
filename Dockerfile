# Improved Dockerfile for Payload CMS v3 with MongoDB Atlas and UploadThing
# Requires `output: 'standalone'` in next.config.js

FROM node:22.17.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install necessary packages for node-gyp and MongoDB native dependencies
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Enable corepack for pnpm support
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable

# Build-time arguments (these can be passed during docker build)
ARG NEXT_PUBLIC_SERVER_URL
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG PREVIEW_SECRET
ARG UPLOADTHING_TOKEN
ARG SMTP_HOST
ARG SMTP_PASS
ARG SMTP_USER

# Set build-time environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--no-deprecation"
ENV DATABASE_URI=${DATABASE_URI}
ENV SMTP_HOST=${SMTP_HOST}
ENV SMTP_PASS=${SMTP_PASS}
ENV SMTP_USER=${SMTP_USER}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV PREVIEW_SECRET=${PREVIEW_SECRET}
ENV UPLOADTHING_TOKEN=${UPLOADTHING_TOKEN}
# Set public environment variables for build (these get baked into the client bundle)
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Payload types and import maps before building
# Note: If these commands need database access, you might need DATABASE_URI as build arg
RUN pnpm run generate:types
RUN pnpm run generate:importmap

# Build the application
RUN pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--no-deprecation"

# Runtime environment variables (these will be provided by Coolify)
ENV CRON_SECRET=""
ENV DATABASE_URI=""
ENV NEXT_PUBLIC_SERVER_URL=""
ENV PAYLOAD_SECRET=""
ENV PREVIEW_SECRET=""
ENV SMTP_HOST=""
ENV SMTP_PASS=""
ENV SMTP_USER=""
ENV UPLOADTHING_TOKEN=""

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets (remove this line if you don't have a public folder)
COPY --from=builder /app/public ./public

# Create and set permissions for .next directory
RUN mkdir .next && chown nextjs:nodejs .next

# Copy built application with correct ownership
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy payload-generated files
COPY --from=builder --chown=nextjs:nodejs /app/payload-types.ts ./payload-types.ts

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "http.get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Start the application
CMD ["node", "server.js"]