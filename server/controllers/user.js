const User = require('../entities/user.js');

// Récupération des informations (sauf les mots de passe) de tous les utilisateurs existants dans la base de données 
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message" : "DataBase Error !",
            "error" : err
        })
    }
};


// Récupération des informations (sauf son mot de passe) d'un seul utilisateur
module.exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userid }).select("-password")
        if (!user) {
            res.status(404).json({
                status: 404,
                "message": "User not found !"
            });
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message" : "DataBase Error !",
            "error" : err
        });
    }
};


// Suppression d'un utilisateur
module.exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userid });
        if (!user) {
            res.status(404).json({
                status: 404,
                "message": "User not found !"
            });
        } else {
            res.status(204).json({
                status: 204,
                "message": "User successfully deleted !"
            });
        }
    } catch(err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error !",
            "error": err
        });
    }
};