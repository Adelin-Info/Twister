const jwt = require('jsonwebtoken');
const User = require('../entities/user');

// Vérifie si l'utilisateur est présent tout au long de sa naviguation
module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err){
                res.locals.user = null;
                next()
            } else {
                let user = await User.findOne(decodedToken.id);
                res.locals.user = user;
                next()
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
};

// Utile pour le front, recupérant le userId dans le token créer lors du login
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send(404).json("No token");
            } else {
                console.log(decodedToken.id);
                next();
            }
        });
    } else {
        console.log("No token");
    }
};