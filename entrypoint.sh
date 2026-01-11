#!/bin/sh
set -e

# Set the port in nginx configuration
if [ -z "$PORT" ]; then
  echo "PORT environment variable is not set, defaulting to 80"
  export PORT=80
fi
sed -i "s/\${PORT:-80}/$PORT/g" /etc/nginx/nginx.conf

# Ensure storage and bootstrap folders are writable
echo "Fixing permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 777 /var/www/storage /var/www/bootstrap/cache

# Create storage link if it doesn't exist
if [ ! -L /var/www/public/storage ]; then
    echo "Creating storage link..."
    php artisan storage:link || true
fi

# Clean up any old caches
echo "Clearing old caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Optimizations (only if APP_KEY is set)
if [ -z "$APP_KEY" ]; then
    echo "WARNING: APP_KEY is not set. Laravel may fail with 500 error."
else
    echo "Applying optimizations..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
fi

# Start PHP-FPM and Nginx
echo "Starting application on port $PORT..."
php-fpm -D

# Tail Laravel logs to stdout in the background
if [ -f /var/www/storage/logs/laravel.log ]; then
    tail -f /var/www/storage/logs/laravel.log &
fi

nginx -g "daemon off;"


