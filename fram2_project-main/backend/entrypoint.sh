#!/bin/bash

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Start PHP-FPM (in background) and Nginx
php-fpm -D && nginx -g "daemon off;"
