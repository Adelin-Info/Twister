const User = require("../entities/user");

// Suivre un utilisateur
module.exports.followUser = async (req, res) => {
    try {
        const { userIdToFollow } = req.body;
        if (!userIdToFollow){
            res.status(400).json({
                status: 400,
                "message": "Missing Parametters !"
            }); 
        } 

        const userFollower = await User.findOneAndUpdate({ _id: req.params.userid }, 
            { $addToSet: { followings : userIdToFollow}},
            {returnDocument: "after"}).select("-password");

        if (!userFollower){
            res.status(404).json({
                status: 404,
                "message": "User not found !"
            });
        } else {
            res.status(201).json(userFollower);
        }

        const userFollowing = await User.findOneAndUpdate({ _id: userIdToFollow }, 
            { $addToSet: { followers : req.params.userid}},
            {returnDocument: "after"}).select("-password");
        if (!userFollowing){
            res.status(404).json({
                status: 404,
                "message": "User not found !"
            });
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error",
            "error" : err
        });
    }
};


// Ne plus suivre un utilisateur
module.exports.unfollowUser = async (req, res) => {
    try {
        const { userIdToUnfollow } = req.body; 
        if (!userIdToUnfollow){
            res.status(400).json({
                status: 400,
                "message": "Missing Parametters !"
            }); 
        }

        const userUnfollower = await User.findOneAndUpdate({ _id: req.params.userid }, 
            { $pull: { followings : userIdToUnfollow}},
            {returnDocument: "after"}).select("-password");
            
        if (!userUnfollower){
            res.status(404).json({
                status: 404,
                "message": "User not found ! "
            });
        } else {
            res.status(201).json(userUnfollower);
        }

        const userUnfollowing = await User.findOneAndUpdate({ _id: userIdToUnfollow }, 
            { $pull: { followers : req.params.userid}},
            {returnDocument: "after"}).select("-password");
        if (!userUnfollowing){
            res.status(404).json({
                status: 404,
                "message": "User not found !"
            });
        }
    } catch (err) {
        res.status(504).json({
            status: 504,
            "message": "DataBase Error !",
            "error" : err
        });
    }
};