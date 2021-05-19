const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//const MaskData = require('../node_modules/maskdata');

exports.signupUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      // Mise en place de maskData pour masquer l'email dans la base de données
      //const emailMask2Options = {
      //  maskWith: "*", 
      //  unmaskedStartCharactersBeforeAt: 3,
      //  unmaskedEndCharactersAfterAt: 2,
      //  maskAtTheRate: false
      //};
      //const email = req.body.email;
      //const maskedEmail = MaskData.maskEmail2(email, emailMask2Options);
      // ----- //
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.loginUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};