import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { followUser, unfollowUser} from "../actions/user";
import { isEmpty } from "./Utils"; 

function FollowHandler(props){
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, props.userIdToFollow));
        setIsFollowed(true);
    };

    const handleUnfollow = () => {
        dispatch(unfollowUser(userData._id, props.userIdToFollow));
        setIsFollowed(false);
    };

    // Permet de savoir si l'utilisateur qui à posté le message est un ami ou pas
    useEffect(() => {
        if (!isEmpty(userData.followings)) {
            if (userData.followings.includes(props.userIdToFollow)){
                setIsFollowed(true);
            } else {
                setIsFollowed(false)
            }
        }
    }, [userData, props.userIdToFollow]);

    return (
        <div>
            {isFollowed && !isEmpty(userData) ? (
                <span onClick={handleUnfollow}>
                    <img src="./img/unfollow.svg" alt="unfollow"/>
                </span>
            ) : (
                <span onClick={handleFollow}>
                    <img srr="./img/follow.svg" alt="follow"/>
                </span>
            )}
        </div>
    );
};

export default FollowHandler;