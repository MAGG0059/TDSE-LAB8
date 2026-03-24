#!/bin/bash

set -e

echo "Creating directories..."
mkdir -p html certbot/conf certbot/www

echo "Starting Apache..."
docker-compose up -d

echo "Waiting for Apache to start..."
sleep 10

echo "Obtaining SSL certificate..."
docker run -it --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  certbot/certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  -d manueltdse.duckdns.org \
  --email tu-email@example.com \
  --agree-tos \
  --no-eff-email

echo "Reloading Apache to apply SSL..."
docker-compose restart apache

echo "Deployment complete!"
echo "Frontend: https://manueltdse.duckdns.org"