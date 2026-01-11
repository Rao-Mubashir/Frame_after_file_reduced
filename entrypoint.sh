#!/bin/sh
set -e

# Set the port in nginx configuration
if [ -z "$PORT" ]; then
  echo "PORT environment variable is not set, defaulting to 80"
  export PORT=80
fi
sed -i "s/\${PORT:-80}/$PORT/g" /etc/nginx/nginx.conf

# Ensure database directory exists and has a sqlite file if using sqlite
if [ "$DB_CONNECTION" = "sqlite" ] || [ -z "$DB_CONNECTION" ]; then
    echo "Using SQLite. Checking for database file..."
    mkdir -p /var/www/database
    if [ ! -f /var/www/database/database.sqlite ]; then
        echo "Creating database/database.sqlite..."
        touch /var/www/database/database.sqlite
    fi
    # Set permissions on the directory and file so artisan commands can write to it
    chown -R www-data:www-data /var/www/database
    chmod -R 775 /var/www/database
fi

# Ensure storage and bootstrap folders are writable
echo "Fixing permissions for storage and cache..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache



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

# Run migrations (Safe for SQLite, ensured file exists above)
echo "Running migrations..."
php artisan migrate --force || echo "Migration failed, continuing..."

# Seed the database
echo "Seeding database..."
php artisan db:seed --force || echo "Seeding failed, continuing..."


# Optimizations (only if APP_KEY is set)
if [ -z "$APP_KEY" ]; then
    echo "WARNING: APP_KEY is not set. Generating a temporary key for this session..."
    php artisan key:generate --show --no-interaction
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


