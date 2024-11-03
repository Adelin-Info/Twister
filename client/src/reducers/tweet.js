import { 
    GET_ALL_TWEETS,
    UPDATE_TWEET,
    DELETE_TWEET,
    LIKE_TWEET,
    UNLIKE_TWEET,
    UPDATE_COMMENT,
    DELETE_COMMENT    
} from "../actions/tweet";

const initialState = {};

export default function tweetReducer(state = initialState, action){
    switch (action.type){
        case GET_ALL_TWEETS:
            return action.payload;

        case UPDATE_TWEET:
            return state.map((tweet) => {
                if (tweet._id == action.payload.tweetId) {
                    return {
                        ...tweet, 
                        message: action.payload.message
                    };
                } else {
                    return tweet;
                }
            });

        case DELETE_TWEET:
            return state.filter((tweet) => tweet._id != action.payload.tweetId);

        case LIKE_TWEET:
            return state.map((tweet) => {
                if (tweet._id == action.payload.tweetId) {
                    return {
                        ...tweet, 
                        likers: [action.payload.userId, ...tweet.likers]
                    };
                }
                return tweet;
            });

        case UNLIKE_TWEET:
            return state.map((tweet) => {
                if (tweet._id == action.payload.tweetId){
                    return {
                        ...tweet,
                        likers: tweet.likers.filter((id) => id != action.payload.userId)
                    };
                }
                return tweet;
            });

        case UPDATE_COMMENT:
            return state.map((tweet) => {
                if (tweet._id == action.payload.tweetId){
                    return {
                        ...tweet,
                        comments: tweet.comments.map((comment) => {
                            if (comment._id == action.payload.commentId) {
                                return {
                                    ...comment,
                                    text: action.payload.text
                                };
                            } else {
                                return comment;
                            }
                        })
                    };
                } else {
                    return tweet;
                }
            });
        
        case DELETE_COMMENT:
            return state.map((tweet) => {
                if (tweet._id == action.payload.tweetId) {
                    return {
                        ...tweet,
                        comments : tweet.comments.filter((comment) => 
                            comment._id != action.payload.commentId
                        )
                    };
                } else {
                    return tweet;
                }
            });

        default:
            return state;
    };
};