# Stage 1: Build React Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build Laravel/PHP Application
FROM php:8.4-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    oniguruma-dev \
    zip \
    unzip \
    libzip-dev \
    postgresql-dev \
    sqlite-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_pgsql pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd

# Redirect Nginx logs
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

# Set environment defaults for Docker
ENV SESSION_DRIVER=file
ENV LOG_CHANNEL=errorlog
ENV APP_ENV=production
ENV APP_DEBUG=false

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy backend source
COPY backend /var/www

# Copy frontend build from Stage 1 to backend public directory
# The vite build typically outputs to 'dist' in the root
COPY --from=frontend-builder /app/dist /var/www/public

# Install composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Setup storage, bootstrap cache, and database permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/database

# Copy Nginx and entrypoint configs from root
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Expose the port (Render uses the PORT env var)
EXPOSE 80

# Run entrypoint
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
