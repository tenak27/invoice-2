# Guide d'installation Windows pour IAM Invoicer

## Prérequis
- Windows 10 ou Windows 11
- Droits administrateur
- Connexion Internet

## Installation

### Installation automatique (recommandée)

1. Ouvrez PowerShell en tant qu'administrateur

2. Exécutez le script d'installation :
```powershell
.\setup-windows.ps1
```

### Installation de l'environnement de développement

1. Ouvrez PowerShell en tant qu'administrateur

2. Exécutez le script de configuration du développement :
```powershell
.\setup-dev-windows.ps1
```

## Structure des répertoires

```
C:\iam-invoicer\          # Répertoire principal de l'application
├── data\                 # Base de données SQLite
├── dist\                 # Build de production
└── src\                  # Code source

C:\nginx\                 # Serveur web Nginx
├── conf\                 # Configuration Nginx
└── logs\                 # Logs Nginx
```

## Services Windows

L'installation crée deux services Windows :
- **Nginx** : Serveur web (port 80)
- **PM2** : Gestionnaire de processus Node.js

## Commandes utiles

### Gestion des services
```powershell
# Démarrer/Arrêter Nginx
Start-Service nginx
Stop-Service nginx

# Redémarrer l'application
pm2 restart iam-invoicer-api
```

### Logs
```powershell
# Logs Nginx
Get-Content -Path "C:\nginx\logs\error.log" -Tail 100 -Wait

# Logs Application
pm2 logs
```

### Base de données
```powershell
# Migrations
npm run db:migrate

# Réinitialisation
npm run db:reset
```

## Dépannage

1. Si Nginx ne démarre pas :
   - Vérifiez que le port 80 n'est pas utilisé
   - Consultez les logs dans `C:\nginx\logs\error.log`

2. Si l'API ne répond pas :
   - Vérifiez les logs PM2 : `pm2 logs`
   - Assurez-vous que Node.js est bien installé : `node --version`

3. Problèmes de base de données :
   - Vérifiez les permissions du dossier `data`
   - Relancez les migrations : `npm run db:migrate`

## Support

Pour toute assistance, contactez le support IAM TECHNOLOGY.