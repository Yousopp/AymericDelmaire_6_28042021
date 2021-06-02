Projet 6 - Sauce piquante
Delmaire
Aymeric
Formation développeur web
2021

1. Cloner le repositorie du projet 6 en local.

2. Ajouter un fichier ".env" dans le dossier backend et ajouter les clefs appropriées.

Exemple :

DB_HOST=cluster.exemple.net
DB_USER=exempleName
DB_PASS=exemplePassword
DB_NAME=exempleNameDataBase
CRYPTO_SECRET_KEY=exempleSecretKey
TOKEN_SECRET=exempleTokenSecret

// ATTENTIONC // Ces données vous sont fournies par l'administrateur de la base de données.
Cela permet de ne pas afficher les données sensibles, pour accéder à la base de données et les phrases secrètes, directement dans le code source.

3. Ensuite il faut démarrer le frontend, pour cela il suffit de lancer la commande "npm start" depuis le frontend. Vérifiez bien que NPM est bien installé sur votre machine. Sinon, lancer la commande "npm install".

Exemple : PS C:\Users\Aymeric\Documents\formationOpenclassrooms\projet6\frontend> npm start

4. Lancer le serveur Node.js depuis le backend avec la commande "nodemon server".

Exemple : PS C:\Users\Aymeric\Documents\projet6\P6_aymeric_delmairee\backend> nodemon server

Vous devriez voir le message suivant dans votre terminal :

[nodemon] restarting due to changes...
[nodemon] starting `node server.js`
Listening on port 3000
Connexion à MongoDB réussie !

5. Le frontend et le serveur sont maintenant lancés. Vous avez accès au site et au projet 6 dans sa globalité.

Pour toutes questions sur le projet, vous pouvez me contacter.

Aymeric Delmaire - aymeric.delmaire@hotmail.com
