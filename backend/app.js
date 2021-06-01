const dotenv = require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const mongoose = require('mongoose');
const path = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

// Helmet - aide à sécuriser les applications Express en définissant divers en-têtes HTTP.
app.use(helmet.contentSecurityPolicy()); // Atténue les attaques de scripts intersites.
app.use(helmet.dnsPrefetchControl()); // Aide à contrôler la prélecture DNS, ce qui peut améliorer la confidentialité des utilisateurs au détriment des performances.
app.use(helmet.expectCt()); // Aide à atténuer les certificats SSL mal émis.
app.use(helmet.frameguard()); // Aide à atténuer les attaques de détournement de clic.
app.use(helmet.hidePoweredBy()); // Supprime l'en-tête X-Powered-By, qui est défini par défaut dans certains frameworks (comme Express).
app.use(helmet.hsts()); // Indique aux navigateurs de préférer HTTPS à HTTP non sécurisé.
app.use(helmet.ieNoOpen()); // Internet Ex8 - Il force l'enregistrement des téléchargements potentiellement dangereux, ce qui atténue l'exécution du HTML dans le contexte de votre site.
app.use(helmet.noSniff()); // Cela atténue le reniflement de type MIME* qui peut entraîner des failles de sécurité.// * Le type Multipurpose Internet Mail Extensions (type MIME) est un standard permettant d'indiquer la nature et le format d'un document.
app.use(helmet.permittedCrossDomainPolicies()); // Indique à certains clients (principalement des produits Adobe) la politique de votre domaine pour le chargement du contenu interdomaine.
app.use(helmet.referrerPolicy()); // Définit l'en-tête Referrer-Policy qui contrôle les informations définies dans l'en-tête Referer.
app.use(helmet.xssFilter()); // Désactive le filtre de script intersite bogué des navigateurs en définissant l'en-tête X-XSS-Protection sur 0.

// Mise en place de Dotenv, pour sécuriser l'authentification sur la base de données
// Utilisations du fichier .env (en local) et process.env.DB_***
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;