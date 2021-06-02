const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => { // L'utilisateur créé une sauce
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce créée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => { // Récupération d'une sauce par son ID
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => { // L'utilisateur modifie une sauce
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => { // L'utilisateur supprime une sauce
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauce = (req, res, next) => { // Récupération de toutes les sauces
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeSauce = (req, res, next) => { // L'utilisateur like/unlike la sauce
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id
  if (like === 1) { // L'utilisateur like la sauce
    Sauce.findOne( { usersLiked: userId, _id: sauceId})// On vérifie que l'utilisateur n'a pas déjà liké
    .then((sauce) => {// Si c'est déjà liké, on ne fait rien
      if (!sauce) {// Si ce n'est pas liké on lance la fonction de like
        Sauce.updateOne({ // méthode/fonction utilisable grâce à mongoose
          _id: sauceId
        }, {
          // On push l'utilisateur et on incrémente le compteur de 1
          $push: { // Méthode de mongoose/mongoDB
            usersLiked: userId
          },
          $inc: {
            likes: +1
          }, // On incrémente de 1
        })
        .then(() => res.status(200).json({
          message: 'Sauce likée !'// Les messages sont visibles uniquement dans le backend
        }))
        .catch((error) => res.status(400).json({
          error
        }))
      }
    })
  }
  if (like === -1) {
    Sauce.findOne( { usersDisliked: userId, _id: sauceId})
    .then((sauce) => {
      if (!sauce) {
        Sauce.updateOne( // L'utilisateur dislike la sauce
        {
          _id: sauceId
        }, {
          $push: {
            usersDisliked: userId
          },
          $inc: {
            dislikes: +1
          }, // On incrémente de 1
        }
      )
      .then(() => {
        res.status(200).json({
          message: 'Sauce dislikée !'
        })
      })
      .catch((error) => res.status(400).json({
        error
      }))
      }
    })
  }
  if (like === 0) { // Si il s'agit d'annuler un like / dislike
    Sauce.findOne({
        _id: sauceId
      })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {
                usersLiked: userId
              },
              $inc: {
                likes: -1
              }, // On incrémente de -1
            })
            .then(() => res.status(200).json({
              message: 'Like annulé !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
        if (sauce.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
          Sauce.updateOne({
              _id: sauceId
            }, {
              $pull: {
                usersDisliked: userId
              },
              $inc: {
                dislikes: -1
              }, // On incrémente de -1
            })
            .then(() => res.status(200).json({
              message: 'Dislike annulé !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
      })
      .catch((error) => res.status(404).json({
        error
      }))
  }
}