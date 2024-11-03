import api from '../api';

/* REGROUPE TOUTE LES ACTIONS EN RAPPORT AVEC LE TWEET
PERMETTANT D'EFFECTUER LES REQUETES ET DE STOCKER LE RESULAT DANS LE STORE REDUX */

// Tweet
export const GET_ALL_TWEETS = "GET_ALL_TWEETS";
export const ADD_TWEET = "ADD_TWEET";
export const UPDATE_TWEET = "UPDATE_TWEET";
export const DELETE_TWEET = "DELETE_TWEET";
export const LIKE_TWEET = "LIKE_TWEET";
export const UNLIKE_TWEET = "UNLIKE_TWEET";

// Commentaire
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getAllTweets = () =>{
    return (dispatch) => {
        return (api
            .get('/tweet')
            .then((res) => {
               dispatch({ type: GET_ALL_TWEETS, payload: res.data}) 
            })
            .catch((err) => console.log(err))
        );
    };
};

export const addTweet = (authorId, authorUserName, message) =>{
    return (dispatch) => {
        return (api
            .post('/tweet', {authorId, authorUserName, message})
            .then((res) => {
               dispatch({ type: ADD_TWEET, payload: res._id});
            })
            .catch((err) => console.log(err))
        );
    };
};

export const updateTweet = (tweetId, message) =>{
    return (dispatch) => {
        return (api
            .put(`/tweet/${tweetId}`, {message})
            .then((res) => {
               dispatch({ type: UPDATE_TWEET, payload: { message, tweetId } }); 
            })
            .catch((err) => console.log(err))
        );
    };
};

export const deleteTweet = (tweetId) =>{
    return (dispatch) => {
        return (api
            .delete(`/tweet/${tweetId}`)
            .then((res) => {
               dispatch({ type: DELETE_TWEET, payload: { tweetId } }); 
            })
            .catch((err) => console.log(err))
        );
    };
};

export const likeTweet = (tweetId, userId) =>{
    return (dispatch) => {
        return (api
            .patch(`/tweet/like/${tweetId}`, {userId})
            .then((res) => {
               dispatch({ type: LIKE_TWEET, payload: { tweetId, userId } }); 
            })
            .catch((err) => console.log(err))
        );
    };
};

export const unlikeTweet = (tweetId) =>{
    return (dispatch) => {
        return (api
            .patch(`/tweet/unlike/${tweetId}`)
            .then(() => {
               dispatch({ type: UNLIKE_TWEET, payload: { tweetId } }); 
            })
            .catch((err) => console.log(err))
        );
    };
};

export const addComment = (tweetId, commenterId, commenterUserName, text) => {
    return (dispatch) => {
        return (api
            .patch(`/comment/${tweetId}`, {commenterId, commenterUserName, text})
            .then((res) => {
                dispatch({ type: ADD_COMMENT, payload: {tweetId} });
            })
            .catch((err) => console.log(err))
        );
    };
};

export const updateComment = (tweetId, commentId, text) => {
    return (dispatch) => {
        return (api
            .patch(`/comment/update/${tweetId}`, {commentId, text})
            .then((res) => {
                dispatch({ type: UPDATE_COMMENT, payload: {tweetId, commentId, text} });
            })
            .catch((err) => console.log(err))
        );
    };
};

export const deleteComment = (tweetId, commentId) => {
    return (dispatch) => {
        return (api
            .patch(`/comment/delete/${tweetId}`, {commentId})
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: {tweetId, commentId} });
            })
            .catch((err) => console.log(err))
        );
    };
};