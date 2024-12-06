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
sudo apt install -y nginx certbot python3-certbot-nginx git

# Installation de Node.js via NVM
echo "📦 Installation de NVM et Node.js..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install $NODE_VERSION
nvm use $NODE_VERSION

# Création du répertoire de l'application
echo "📁 Création du répertoire de l'application..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR

# Configuration Nginx
echo "🔧 Configuration Nginx..."
sudo tee /etc/nginx/sites-available/$APP_NAME << EOF
server {
    server_name $DOMAIN www.$DOMAIN;

    root $APP_DIR/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, no-cache";
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
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

# Création de la base de données
echo "🗄️ Configuration de la base de données..."
mkdir -p data
npm run db:migrate
npm run db:seed

# Construction du projet
echo "🏗️ Construction du projet..."
npm run build

# Configuration du service PM2
echo "🔧 Configuration du service PM2..."
npm install -g pm2
pm2 startup
pm2 start src/server/index.js --name "$APP_NAME-api"
pm2 save

# Configuration SSL avec Certbot
echo "🔒 Configuration SSL..."
sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

echo "✨ Déploiement terminé!"
echo "🌍 Votre application est accessible sur https://$DOMAIN"