# Instructions d'installation pour Instagram CFPT

## Prérequis

Assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Instructions pour démarrer

### 1. Clonez le dépôt

```bash
git clone https://github.com/mou-inoks/insta-CFPT-micro-service.git
cd insta-cfpt
```

### 2. Créer les fichiers `.env`

#### Backend
Créez un fichier `.env` dans le répertoire backend avec le contenu suivant :
```env
DATABASE_URL=mysql://root:super@mariadb:3306/instacfpt2
JWT_SECRET=mysecret
JWT_EXPIRES_IN=7d
```

#### Frontend
Créez un fichier `.env` dans le répertoire frontend avec le contenu suivant :
```env
VITE_BACKEND_BASE_URL=http://127.0.0.1:9000
VITE_BACKEND_API_URL=http://127.0.0.1:9000/api/v1
```

### 3. Configurer Traefik (Load Balancing)

Traefik est configuré pour router les requêtes vers les services correspondants. Assurez-vous que les labels sont bien définis dans le fichier `docker-compose.yml`. Voici un exemple pour le backend :
```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.backend.rule=Host(`api.insta.cfpt.info`)"
  - "traefik.http.routers.backend.entrypoints=web"
```

Si vous souhaitez tester le hostname `api.insta.cfpt.info` en local, ajoutez la ligne suivante à votre fichier `hosts` :
- **Windows** : `C:\Windows\System32\drivers\etc\hosts`
- **macOS/Linux** : `/etc/hosts`

```plaintext
127.0.0.1  api.insta.cfpt.info
```

Redémarrez ensuite Docker avec :
```bash
docker-compose down && docker-compose up --build
```

### 4. Lancer le projet avec Docker Compose

Pour démarrer tous les services, exécutez la commande suivante :
```bash
docker-compose up --build
```

### 5. Lancer les migrations Prisma

Connectez-vous au conteneur backend et exécutez les migrations Prisma :
```bash
docker exec -it <nom-du-container-backend> npx prisma migrate deploy
```

### 6. Configurer le monitoring (Prometheus et Grafana)

1. **Prometheus** collecte les métriques des services. La configuration est gérée dans le fichier `prometheus.yml`.
2. **Grafana** affiche les métriques sous forme de graphiques. Vous pouvez accéder à Grafana via : [http://localhost:3001](http://localhost:3001).

Pour ajouter un dashboard Grafana :
- Connectez-vous à l'interface Grafana.
- Importez un dashboard à partir d'un ID préexistant (par exemple, 1860 pour Docker).

### 7. Accédez à l’application

- **Frontend** : [http://localhost:3000](http://localhost:3000)
- **Backend** : [http://localhost:9000](http://localhost:9000)

## Prisma : commandes utiles

- **Créer une migration** :
```bash
npx prisma migrate dev --name your-migration-name
```
- **Exécuter les migrations** :
```bash
npx prisma migrate deploy
```
- **Générer les interfaces TypeScript** :
```bash
npx prisma generate
```


## Tree 
.
├── README.md
├── READMEOLD.md
├── backend
│   ├── dockerfile
│   ├── nodemon.json
│   ├── package-lock.json
│   ├── package.json
│   ├── prisma
│   │   └── schema.prisma
│   ├── src
│   │   ├── @types
│   │   │   └── express.d.ts
│   │   ├── config
│   │   │   └── serverConfig.ts
│   │   ├── controllers
│   │   │   ├── controller.ts
│   │   │   └── rabbitmqController.ts
│   │   ├── index.ts
│   │   ├── routes
│   │   │   ├── auth
│   │   │   │   ├── authRoutes.ts
│   │   │   │   └── authService.ts
│   │   │   ├── posts
│   │   │   │   ├── postRoutes.ts
│   │   │   │   └── postService.ts
│   │   │   ├── rabbitMq
│   │   │   │   ├── rabbitmqConsumer.ts
│   │   │   │   └── rabbitmqService.ts
│   │   │   ├── routes.ts
│   │   │   ├── upload
│   │   │   │   ├── uploadController.ts
│   │   │   │   ├── uploadMiddleware.ts
│   │   │   │   ├── uploadRoutes.ts
│   │   │   │   └── uploadServices.ts
│   │   │   └── users
│   │   │       ├── userRoutes.ts
│   │   │       └── userServices.ts
│   │   ├── server.ts
│   │   └── utils
│   │       └── prismaClient.ts
│   ├── tsconfig.json
│   └── yarn.lock
├── db
│   └── mariadb.sql
├── docker-compose.yml
├── frontend
│   ├── Dockerfile
│   ├── README.md
│   ├── components.json
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── public
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── src
│   │   ├── app
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── favicon.ico
│   │   │   ├── fonts
│   │   │   │   ├── GeistMonoVF.woff
│   │   │   │   └── GeistVF.woff
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── login
│   │   │   │   └── page.tsx
│   │   │   ├── page.tsx
│   │   │   └── register
│   │   │       └── page.tsx
│   │   ├── components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── postForm.tsx
│   │   │   ├── postList.tsx
│   │   │   └── ui
│   │   │       ├── avatar.tsx
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       ├── scroll-area.tsx
│   │   │       └── textarea.tsx
│   │   ├── context
│   │   │   ├── AuthContext.tsx
│   │   │   └── PrivateRoute.tsx
│   │   ├── lib
│   │   │   └── utils.ts
│   │   ├── service
│   │   │   └── postService.ts
│   │   ├── types
│   │   │   └── types.ts
│   │   └── utils
│   │       └── auth.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── yarn.lock
├── nginx.conf
├── prometheus
│   └── prometheus.yml
└── yarn.lock

---

Si vous rencontrez des problèmes, assurez-vous que les services Docker sont bien démarrés et que vos fichiers `.env` sont correctement configurés.
