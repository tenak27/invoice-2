# Guide de déploiement Ubuntu pour IAM Invoicer

## Prérequis
- Ubuntu 20.04 ou plus récent
- Un nom de domaine (iamtechnology.store) pointant vers l'IP de votre VPS
- Accès SSH root ou sudo

## Installation

1. Connectez-vous à votre VPS via SSH :
```bash
ssh root@votre-ip-vps
```

2. Clonez le dépôt :
```bash
git clone https://github.com/votre-repo/iam-invoicer.git
cd iam-invoicer
```

3. Rendez le script de déploiement exécutable :
```bash
chmod +x deploy-ubuntu.sh
```

4. Exécutez le script de déploiement :
```bash
./deploy-ubuntu.sh
```

## Structure des répertoires

```
/var/www/iam-invoicer/
├── dist/           # Build de production
├── data/           # Base de données SQLite
└── src/            # Code source
```

## Commandes utiles

### Logs
```bash
# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs Application
pm2 logs
```

### Redémarrage des services
```bash
# Nginx
sudo systemctl restart nginx

# Application
pm2 restart iam-invoicer-api
```

### Base de données
```bash
# Sauvegarde
cp /var/www/iam-invoicer/data/production.db backup.db

# Restauration
cp backup.db /var/www/iam-invoicer/data/production.db
```

## Mise à jour de l'application

1. Pullez les dernières modifications :
```bash
cd /var/www/iam-invoicer
git pull
```

2. Installez les dépendances et reconstruisez :
```bash
npm install
npm run build
```

3. Redémarrez l'application :
```bash
pm2 restart iam-invoicer-api
```

## Sécurité

1. Configurez votre pare-feu :
```bash
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
sudo ufw enable
```

2. Vérifiez régulièrement les logs pour des activités suspectes
3. Maintenez le système à jour avec `apt update` et `apt upgrade`
4. Utilisez des mots de passe forts et changez-les régulièrement

## Support

Pour toute assistance, contactez le support IAM TECHNOLOGY.