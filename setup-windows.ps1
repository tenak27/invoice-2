# Script d'installation Windows pour IAM Invoicer
$ErrorActionPreference = "Stop"

# Variables
$nodeVersion = "18.17.1"
$appName = "iam-invoicer"
$nginxVersion = "1.24.0"
$nginxPath = "C:\nginx"
$appPath = "C:\$appName"

Write-Host "🚀 Installation de IAM Invoicer sur Windows..." -ForegroundColor Cyan

# Vérification de l'exécution en tant qu'administrateur
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "❌ Ce script doit être exécuté en tant qu'administrateur" -ForegroundColor Red
    Exit 1
}

# Installation de Chocolatey si non installé
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Installation de Chocolatey..." -ForegroundColor Yellow
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
}

# Installation des dépendances via Chocolatey
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
choco install -y nodejs-lts git nginx sqlite vscode

# Création des répertoires
Write-Host "📁 Création des répertoires..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $appPath
New-Item -ItemType Directory -Force -Path "$appPath\data"

# Configuration de Nginx
Write-Host "🔧 Configuration de Nginx..." -ForegroundColor Yellow
$nginxConfig = @"
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        root   $appPath\dist;
        index  index.html;

        location / {
            try_files `$uri `$uri/ /index.html;
            expires 1h;
            add_header Cache-Control "public, no-cache";
        }

        location /api {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade `$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host `$host;
            proxy_cache_bypass `$http_upgrade;
        }

        # Sécurité
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Content-Type-Options "nosniff";
    }
}
"@

Set-Content -Path "$nginxPath\conf\nginx.conf" -Value $nginxConfig

# Installation de PM2
Write-Host "📦 Installation de PM2..." -ForegroundColor Yellow
npm install -g pm2 windows-service

# Configuration de PM2 comme service Windows
Write-Host "🔧 Configuration du service PM2..." -ForegroundColor Yellow
pm2-service-install -n "IAMInvoicerPM2"

# Installation des dépendances du projet
Write-Host "📦 Installation des dépendances du projet..." -ForegroundColor Yellow
Set-Location $appPath
npm install

# Initialisation de la base de données
Write-Host "🗄️ Initialisation de la base de données..." -ForegroundColor Yellow
npm run db:migrate
npm run db:seed

# Construction du projet
Write-Host "🏗️ Construction du projet..." -ForegroundColor Yellow
npm run build

# Démarrage des services
Write-Host "🚀 Démarrage des services..." -ForegroundColor Yellow
Start-Service nginx
pm2 start ecosystem.config.js

Write-Host "✨ Installation terminée!" -ForegroundColor Green
Write-Host "📝 Notes importantes:" -ForegroundColor Yellow
Write-Host "1. L'application est accessible sur http://localhost" -ForegroundColor White
Write-Host "2. L'API tourne sur http://localhost:5000" -ForegroundColor White
Write-Host "3. Les logs sont disponibles dans C:\nginx\logs" -ForegroundColor White
Write-Host "4. La base de données est située dans $appPath\data" -ForegroundColor White