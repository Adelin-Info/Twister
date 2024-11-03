import axios from "axios";

/* REGROUPE TOUTE LES ACTIONS EN RAPPORT AVEC LE UTILISATEUR
PERMETTANT D'EFFECTUER LES REQUETES ET DE STOCKER LE RESULAT DANS LE STORE REDUX */

// Utilisateur
export const GET_USER_INFO = "GET_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";

// Ami
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER"

export const getAllUsers = () => {
    return (dispatch) => {
        return (axios
            .get('http://localhost:5000/api/user')
            .then((res) => {
                dispatch({ type: GET_ALL_USERS, payload: res.data});
            })
            .catch((err) => console.log(err))
        )
    };
};

export const getUserInfo =  (userId) => {
    return (dispatch) => {
        return ( axios
            .get(`http://localhost:5000/api/user/${userId}`)
            .then((res) => {
                dispatch({ type: GET_USER_INFO, payload: res.data});
            })
            .catch((err) => console.log(err))
        )
    };
};

export const followUser = (userId, userIdToFollow) => {
    return (dispatch) => {
        return ( axios
            ({
                method: "patch",
                url: `http://localhost:5000/friend/follow/${userId}`,
                data : { userIdToFollow}
            })
                .then(() => {
                    dispatch({ type: FOLLOW_USER, payload: {userIdToFollow} });
                })
                .catch((err) => console.log(err))
        );
    };
}

export const unfollowUser = (userId, userIdToUnfollow) => {
    return (dispatch) => {
        return (axios
            ({
                method: "patch",
                url: `http://localhost:5000/friend/follow/${userId}`,
                data : { userIdToUnfollow}
            })
                .then(() => {
                    dispatch({ type: FOLLOW_USER, payload: {userIdToUnfollow} });
                })
                .catch((err) => console.log(err))
        );
    };
}