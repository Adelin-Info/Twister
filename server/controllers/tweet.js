const Tweet = require('../entities/tweet.js');

// Création d'un message
module.exports.createTweet = async (req, res) => {
    try {
        const { authorId, authorUserName, message } = req.body
        if (!authorId || !authorUserName || !message) {
            res.status(400).json({
                status: 400,
                "message": "Missing Parameters !"
            });
        }

        else {
            
            const tweet = new Tweet({
                authorId: authorId,
                authorUserName: authorUserName,
                message: message,
                likers: [],
                comments: [],
                timestamp: new Date().getTime()
            });

            await tweet.save();
            res.status(201).json(tweet);
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message" : "DataBase Error !",
            "error": err
        });
    }
};


// Récupération de tous les messages existants dans la base de données du plus récent au plus ancien 
module.exports.getAllTweets = async (req, res) => {
    try {
        const tweets = await Tweet.find().sort({ createdAt: -1});
        res.status(200).json(tweets);
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error !",
            "error" : err
        });
    } 
};


// Modification d'un message déjà créer par l'utilisateur lui-même
module.exports.updateTweet = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            res.status(400).json({
                status: 400,
                "message": "Missing Parameters !"
            })
        }

        const tweet = await Tweet.findOneAndUpdate({ _id: req.params.tweetid}, {$set: {message: message}}, {returnDocument:"after"});
        if (!tweet){
            res.status(404).json({
                status: 404,
                "message": "Tweet not found !"
            });
        } else {
            res.status(200).json(tweet);
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error !",
            "error": err
        });
    }
};


// Suppression d'un message par l'utilisateur
module.exports.deleteTweet = async (req, res) => {
    try {
        await Tweet.deleteOne({ _id: req.params.tweetid });
        res.status(204).json({
            status: 204,
            "message": "Tweet successfully deleted !"
        });
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error !",
            "error" : err
        });
    }
};


// Utilisateur ajoute son j'aime à un message
module.exports.likeTweet = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({
                status: 400,
                "message": "Missing Parameters !"
            });
        }
        const tweet = await Tweet.findOneAndUpdate({_id: req.params.tweetid}, {$addToSet: { likers: userId}}, {returnDocument: "after"});
        if (!tweet){
            res.status(404).json({
                status: 404,
                "message": "Tweet not found !"
            });
        } else {
            res.status(200).json(tweet);
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error !",
            "error" : err
        });
    }
};


// Utilisateur retire son j'aime du message
module.exports.unlikeTweet = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            res.status(400).json({
                status: 400,
                "message": "Missing Parameters !"
            });
        }

        const tweet = await Tweet.findOneAndUpdate({_id: req.params.tweetid}, {$pull: { likers: userId}}, {returnDocument: "after"});
        if (!tweet){
            res.status(404).json({
                status: 404,
                "message": "Tweet not found !"
            });
        } else {
            res.status(200).json(tweet);
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error !",
            "error" : err
        });
    }
};