#!/bin/sh

# Set the port in nginx configuration
sed -i "s/\${PORT:-80}/$PORT/g" /etc/nginx/nginx.conf

# Create storage link
php artisan storage:link

# Optimizations
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM and Nginx
echo "Starting application on port $PORT..."
php-fpm -D
nginx -g "daemon off;"
