#!/bin/bash

# Variables
APP_NAME="iam-invoicer"
DOMAIN="iamtechnology.store"
APP_DIR="/var/www/$APP_NAME"
NODE_VERSION="18"

# Mise à jour du système
echo "📦 Mise à jour du système..."
sudo apt update && sudo apt upgrade -y

# Installation des dépendances
echo "📦 Installation des dépendances..."
sudo apt install -y nginx certbot python3-certbot-nginx

# Installation de Node.js
echo "📦 Installation de Node.js $NODE_VERSION..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
sudo apt install -y nodejs

# Création du répertoire de l'application
echo "📁 Création du répertoire de l'application..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# Configuration Nginx
echo "🔧 Configuration Nginx..."
sudo tee /etc/nginx/sites-available/$APP_NAME << EOF
server {
    server_name $DOMAIN www.$DOMAIN;

    root $APP_DIR;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, no-cache";
    }

    # Sécurité
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    
    # Compression gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;
}
EOF

# Activation du site
echo "🔧 Activation du site Nginx..."
sudo ln -sf /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test de la configuration Nginx
echo "✅ Vérification de la configuration Nginx..."
sudo nginx -t

# Redémarrage de Nginx
echo "🔄 Redémarrage de Nginx..."
sudo systemctl restart nginx

# Installation des dépendances du projet
echo "📦 Installation des dépendances du projet..."
npm install

# Construction du projet
echo "🏗️ Construction du projet..."
npm run build

# Déploiement des fichiers
echo "📦 Déploiement des fichiers..."
sudo cp -r dist/* $APP_DIR/

# Configuration SSL avec Certbot
echo "🔒 Configuration SSL..."
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

echo "✨ Déploiement terminé!"
echo "🌍 Votre application est accessible sur https://$DOMAIN"