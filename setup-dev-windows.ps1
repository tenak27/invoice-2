# Script d'installation de l'environnement de développement Windows
$ErrorActionPreference = "Stop"

Write-Host "🚀 Configuration de l'environnement de développement..." -ForegroundColor Cyan

# Installation des outils de développement via Chocolatey
Write-Host "📦 Installation des outils de développement..." -ForegroundColor Yellow
choco install -y nodejs-lts git vscode sqlite postman

# Installation des extensions VSCode recommandées
Write-Host "🔧 Installation des extensions VSCode..." -ForegroundColor Yellow
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension formulahendry.auto-rename-tag
code --install-extension mikestead.dotenv
code --install-extension prisma.prisma

# Configuration de Git
Write-Host "🔧 Configuration de Git..." -ForegroundColor Yellow
git config --global core.autocrlf true
git config --global core.eol lf

# Installation des dépendances globales
Write-Host "📦 Installation des dépendances globales..." -ForegroundColor Yellow
npm install -g typescript ts-node nodemon

# Configuration des variables d'environnement
Write-Host "🔧 Configuration des variables d'environnement..." -ForegroundColor Yellow
$envContent = @"
DATABASE_URL="file:./data/dev.db"
JWT_SECRET="dev-secret-key"
VITE_API_URL="http://localhost:5000/api"
"@
Set-Content -Path ".env.development" -Value $envContent

Write-Host "✨ Configuration de l'environnement de développement terminée!" -ForegroundColor Green
Write-Host "📝 Pour démarrer le développement:" -ForegroundColor Yellow
Write-Host "1. npm install" -ForegroundColor White
Write-Host "2. npm run dev" -ForegroundColor White