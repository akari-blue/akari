# Build stage
FROM node:20-slim AS builder

# Set environment variables for build
ENV NODE_ENV=production \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Install Python and build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-setuptools \
    python3-wheel \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy only the files needed for installation
COPY package*.json tsconfig*.json ./

# Install dependencies
RUN npm ci --include=dev

# Copy source code and configs
COPY src ./src
COPY Caddyfile ./Caddyfile
COPY postcss.config.js ./postcss.config.js
COPY tailwind.config.js ./tailwind.config.js
COPY vite.config.ts ./vite.config.ts
COPY index.html ./index.html

# Build the application
RUN npm run build

# Production stage
FROM node:20-slim AS runner

# Set environment variables
ENV NODE_ENV=production \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false

# Install Caddy
RUN apt-get update && apt-get install -y \
    curl \
    debian-keyring \
    debian-archive-keyring \
    apt-transport-https \
    && curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg \
    && curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list \
    && apt-get update \
    && apt-get install -y caddy \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only the built files and Caddyfile from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/Caddyfile ./Caddyfile

# Format Caddyfile
RUN caddy fmt --overwrite Caddyfile

# Expose ports
EXPOSE 80 443

# Start Caddy
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]