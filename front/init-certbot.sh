#!/bin/bash

mkdir -p certbot/conf certbot/www

docker run -it --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  certbot/certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  -d manueltdse.duckdns.org \
  --email tu-email@example.com \
  --agree-tos \
  --no-eff-email