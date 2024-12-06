# IAM Invoicer - Guide de déploiement VPS

## Prérequis

- Un VPS sous Ubuntu
- Un nom de domaine (iamtechnology.store) pointant vers votre VPS
- Accès SSH root ou sudo

## Installation

1. Connectez-vous à votre VPS via SSH :
```bash
ssh root@votre-ip-vps
```

2. Clonez le dépôt dans le répertoire de votre choix :
```bash
git clone <repository-url>
cd iam-invoicer
```

3. Rendez le script de déploiement exécutable :
```bash
chmod +x deploy.sh
```

4. Exécutez le script de déploiement :
```bash
./deploy.sh
```

## Que fait le script ?

1. Met à jour le système
2. Installe Nginx, Certbot et Node.js
3. Configure Nginx pour votre domaine
4. Installe les dépendances du projet
5. Construit l'application
6. Configure SSL avec Let's Encrypt
7. Démarre l'application

## Maintenance

Pour mettre à jour l'application :
```bash
git pull
./deploy.sh
```

## Logs

Pour consulter les logs Nginx :
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## Support

Pour toute assistance, contactez le support IAM TECHNOLOGY.