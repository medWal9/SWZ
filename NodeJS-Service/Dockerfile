# Utiliser une image de base Node.js avec Linux (Alpine pour une image légère)
FROM node:18-alpine AS base

# Définir le répertoire de travail dans le conteneur
WORKDIR /node-app

# Copier les fichiers package.json et package-lock.json dans le conteneur
COPY package*.json /node-app/

# Installer les dépendances de l'application
RUN npm install

# Copier le reste du code de l'application dans le conteneur
COPY . /node-app/

ARG BUILD_TARGET
RUN echo "base target: $BUILD_TARGET"

#RUN npm run build

FROM base AS base-local

ENV ENVIRONMENT=local

# Exposer le port sur lequel l'application va tourner (ex: 3000) - obtenir le port du yml
EXPOSE 12345

RUN cd /node-app/

# Définir la commande pour lancer l'application
CMD ["node-ts", "/src/server.ts"]

FROM base AS base-dev

ENV ENVIRONMENT=dev

# Exposer le port sur lequel l'application va tourner (ex: 3000) - obtenir le port du yml
EXPOSE 12345

RUN cd /node-app/

# Définir la commande pour lancer l'application
CMD ["node-ts", "/src/server.ts"]
