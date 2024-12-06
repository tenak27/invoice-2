# Guide de déploiement VPS pour IAM Invoicer

## Prérequis
- Un VPS sous Ubuntu 20.04 ou plus récent
- Un nom de domaine (iamtechnology.store) pointant vers l'IP de votre VPS
- Accès SSH root ou sudo

## Étapes de déploiement

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
chmod +x deploy-vps.sh
```

4. Exécutez le script de déploiement :
```bash
./deploy-vps.sh
```

## Que fait le script ?

1. Met à jour le système
2. Installe les dépendances nécessaires (Nginx, Node.js, etc.)
3. Configure Nginx avec SSL
4. Installe et configure PM2 pour la gestion des processus
5. Crée et initialise la base de données
6. Construit et déploie l'application

## Maintenance

### Mise à jour de l'application
```bash
cd /var/www/iam-invoicer
git pull
npm install
npm run build
pm2 restart iam-invoicer-api
```

### Logs
```bash
# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs Application
pm2 logs iam-invoicer-api
```

### Base de données
La base de données SQLite est stockée dans `/var/www/iam-invoicer/data/database.sqlite`

## Support
Pour toute assistance, contactez le support IAM TECHNOLOGY.