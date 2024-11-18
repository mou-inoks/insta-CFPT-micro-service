# Utilise l'image officielle de Node.js (LTS)
FROM node:18 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock si vous utilisez Yarn)
COPY ./package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Exposer le port sur lequel Next.js va écouter
EXPOSE 3000

# Démarrer le serveur Next.js en mode développement
CMD ["npm", "run", "dev"]