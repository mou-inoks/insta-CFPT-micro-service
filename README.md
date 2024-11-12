# Instructions d'installation pour Instagram CFPT

## Prérequis

Assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Instructions pour démarrer

**1. Clonez le dépôt :**

  ```bash
   git clone git@gitlab.ictge.ch:theo-rbb/insta-cfpt.git
   cd insta-cfpt
  ```

**2. Créer les fichiers .env :**

Backend:
```bash
DATABASE_URL=mysql://root:super@mariadb:3306/instacfpt2
```

**3. Lancer le projet avec docker compose :**
  ```bash
   docker-compose up --build
  ```

**4. Lancer les migrations :**
  - Se connecter en interactive au container et lancer la commande :
  ```npx prisma migrate deploy```


## Accédez à l’application
- **Frontend** : [http://localhost:3000](http://localhost:3000)
- **Backend** : [http://localhost:9000](http://localhost:9000)

## Prisma
- **Create Migration** : npx prisma migrate dev --name your-migration-name
- **Run Migration** : npx prisma migrate deploy
- **Generate TS Interface** npx prisma generate