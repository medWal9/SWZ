# Projet Node.js avec MongoDB sous Docker

Ce projet configure une application Node.js avec MongoDB en utilisant Docker et Docker Compose. L'objectif est de faciliter le déploiement et l'exécution dans différents environnements (local, dev, etc.).

---

## **Structure des fichiers**

- **Dockerfile** : Contient les instructions pour construire l'image Docker.
- **docker-compose.yml** : Configure les services de l'application (Node.js et MongoDB).
- **${nom_environnement}.yaml**(exemple: dev.yaml) : Fichier optionnel pour définir les variables d'environnement.

---

## **Prérequis**

1. [Docker](https://www.docker.com/products/docker-desktop) installé.
2. [Docker Compose](https://docs.docker.com/compose/install/) installé.
3. [MongoDB](https://www.mongodb.com/docs/manual/installation/) installé localement si nécessaire.

---

## **Configuration des environnements**

### Variables d'environnement utilisées :

- **BUILD_TARGET** : Spécifie la cible de build pour l'image Docker. Valeurs possibles : `base-local`, `base-dev`.
- **ENVIRONMENT** : Définit l'environnement d'exécution de l'application (`local`, `dev`, etc.).
- **MONGO_URI** : URI de connexion à MongoDB (optionnel).

Vous pouvez configurer ces variables dans un fichier `.env` :

```env
BUILD_TARGET=base-local
ENVIRONMENT=local
```

---

## **Construction et exécution par environnement**

### **Local**

#### Avec Docker

1. Construire l'image :
   ```bash
   docker-compose build --build-arg $BUILD_TARGET=base-local 
   ```
2. Lancer les services :
   ```bash
   docker-compose up
   ```

#### Sans Docker (via terminal)

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Lancer MongoDB localement :
   ```bash
   mongod --dbpath=<chemin_du_répertoire_des_données>
   ```
3. Lancer l'application :
   ```bash
   npm start
   ```

### **Développement (dev)**

#### Avec Docker

1. Construire l'image :
   ```bash
   docker-compose build --build-arg $BUILD_TARGET=base-dev
   ```
2. Lancer les services :
   ```bash
   docker-compose up
   ```

#### Sans Docker (via terminal)

1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Lancer MongoDB localement pour l'environnement de dev :
   ```bash
   mongod --dbpath=<chemin_du_répertoire_des_données_dev>
   ```
3. Définir les variables d'environnement pour dev :
   ```bash
   export NODE_ENV=dev
   export MONGO_URI=mongodb://localhost:27017/dev_db
   ```
4. Lancer l'application :
   ```bash
   npm start
   ```

---

## **Services configurés**

### 1. **Application Node.js**

- **Ports exposés :**
  - 12345 (par défaut).
- **Volumes montés :**
  - Code source local (`.:/app`).
  - Exclusion de `node_modules` pour éviter les conflits.
- **Commande exécutée :**
  ```bash
  npm start
  ```

### 2. **Base de données MongoDB**

- **Image utilisée :** `mongo:latest`
- **Ports exposés :**
  - 27017 (par défaut).
- **Volumes montés :**
  - `mongo_data:/data/db` pour persister les données MongoDB.

#### Avec Docker

1. Lancer MongoDB seul :
   ```bash
   docker-compose up mongo
   ```

#### Sans Docker

1. Lancer MongoDB localement :
   ```bash
   mongod --dbpath=<chemin_du_répertoire_des_données>
   ```

---

## **Commandes utiles**

### Lancer les services

```bash
docker-compose up --build
```

### Arrêter les services

```bash
docker-compose down
```

### Vérifier les logs

```bash
docker-compose logs -f
```

### Supprimer les conteneurs et volumes

```bash
docker-compose down -v
```

---

## **Volumes**

- **mongo_data** : Permet de persister les données MongoDB entre les redémarrages du conteneur.

---

## **Notes**

- Si vous souhaitez ajouter d'autres environnements, mettez à jour les sections correspondantes dans le `Dockerfile` et le `docker-compose.yml`.
- Vérifiez que les variables d'environnement sont correctement définies pour chaque environnement.

---

## **Dépannage**

- Si l'application Node.js n'arrive pas à se connecter à MongoDB, vérifiez que le service `mongo` est bien lancé et accessible via `MONGO_URI`.

