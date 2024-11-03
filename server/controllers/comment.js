const Tweet = require('../entities/tweet.js');

// Création d'un commentaire à un message
module.exports.createComment= async (req, res) => {
    try {
        const { commenterId, commenterUserName, text } = req.body;
        if (!commenterId || !commenterUserName || !text){
            res.status(400).json({
                status: 400,
                "message": "Missing Parameters"
            });
        }

        const tweet = await Tweet.findOneAndUpdate({ _id: req.params.tweetid}, {
            $push : {
                comments: {
                    commenterId: commenterId,
                    commenterUserName: commenterUserName,
                    text: text,
                    timestamp: new Date().getTime()
                }
            }
        }, {returnDocument: "after"});

        if (!tweet) {
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
            "message": "DataBase Error",
            "error" : err
        });
    }
};


// Modifier un commentaire
module.exports.updateComment = async (req, res) => {
    try {
        const { commentId, text } = req.body;
        if (!commentId || !text){
            res.status(400).json({
                status: 400,
                "message": "Missing Parameters"
            });
        }

        const tweet = await Tweet.findOne({_id: req.params.tweetid});
        if (!tweet) {
            res.status(404).json({
                status: 404,
                "message": "Tweet not found !"
            });
        } else {
            const update_comment = tweet.comments.find(comment => comment._id.equals(commentId));
            if (!update_comment){
                res.status(404).json({
                    status: 404,
                    "message": "Comment not found !"
                }); 
            } else {
                update_comment.text = text;
                await tweet.save();
                res.status(200).json(tweet)
            }
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error",
            "error" : err
        });
    }
};


// Supprimer un commentaire
module.exports.deleteComment = async (req, res) => {
    try {
        const {commentId} = req.body;
        if (!commentId) {
            res.status(400).json({
                status: 400,
                "message": "Missing Parametters"
            });
        }

        const tweet = await Tweet.findOneAndUpdate({ _id: req.params.tweetid}, {
            $pull : {
                comments: {
                    _id: commentId
                }
            }
        }, {returnDocument: "after"});
        if (!tweet) {
            res.status(404).json({
                status: 404,
                "message": "Tweet or Comment not found !"
            });
        } else {
            res.status(204).json(tweet);
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error !",
            "error" : err
        });
    }
};