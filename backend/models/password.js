const passwordValidator = require('password-validator');
 
// Création d'un schéma pour le password
const passwordSchema = new passwordValidator();
 
// Propriétés du password
passwordSchema
.is().min(8)                                    // Mini 8 caractères
.is().max(100)                                  // Maxi 100 caractères
.has().uppercase()                              // Pas de majuscules
.has().lowercase()                              // Pas de minuscules
.has().digits(2)                                // Mini 2 chiffres
.has().not().spaces()                           // Pas d'espaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Mots interdits

module.exports = passwordSchema;