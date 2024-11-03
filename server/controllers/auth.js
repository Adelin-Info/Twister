const User = require('../entities/user.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const deadline = 3*24*3600*1000;
// Création d'un token
const createToken = (userid) => {
    return jwt.sign({userid}, process.env.TOKEN_SECRET, { expiresIn: deadline });
}

// Créer un cookie contenant un token d'authentification qui lui même contient le userId de la personne qui se connecte
module.exports.signIn = async (req, res) => {
    try {
        const {email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                status: 400,
                "message" : "Missing Parameters !"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({
                status: 401,
                "message" : "Incorrect email !"
            });
        } else {
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                res.status(401).json({
                    status: 401,
                    "message" : "Incorrect password !"
                });
            } else {
                const token = createToken(user._id);
                res.cookie('jwt', token, {httpOnly: true, deadline});
                res.status(200).json({
                    userId : user._id
                });
            }
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error !",
            "error": err
        });
    }
};


// Suppression du cookie provoquant une déconnexion
module.exports.signOut = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 1});
        res.redirect('/');
    } catch (err) {
        res.status(500).json({
            status: 500,
            "message" : "Intern Error !",
            "error": err
        });
    }
};

// Création d'un utilisateur après son inscription
module.exports.signUp = async (req, res, next) => {
    try {
        const { userName, email, password, firstName, lastName } = req.body;
        if (!userName || !email || !password || !firstName || !lastName) {
            res.status(400).json({
                status: 400,
                "message": "Missing Parameters !"
            });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({
            userName: userName,
            email: email,
            password: hashed,
            firstName: firstName,
            lastName: lastName
        });

        try {
            await user.save();
            res.status(201).json({
                status: 201,
                "message": "User created !"
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                "message": "Intern Error !",
                "error": err
            });
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error !",
            "error": err
        })
    }
};