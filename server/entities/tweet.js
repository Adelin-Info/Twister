const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema(
    {
        authorId: {
            type: String,
            require: true
        },

        authorUserName: {
            type: String,
            require: true
        },

        message: {
            type: String,
            trim: true
        },

        likers: {
            type: [String],
            required: true,
        },

        comments: {
            type: [
                {
                    commenterId: String,
                    commenterUserName: String,
                    text: String,
                    timeStamp: Number,
                }
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Tweet = mongoose.model('tweet', TweetSchema);
module.exports = Tweet;