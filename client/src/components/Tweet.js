import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser } from "./Utils";
import { deleteTweet, likeTweet, unlikeTweet, updateTweet } from "../actions/tweet";
import ListComment from "./ListComment";
import { UserIdContext } from "./UserIdContext";
import FollowHandler from "./FollowHandler";


function Tweet(props){

    // Etats
    const [isUpdated, setIsUpdated] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [messageUpdate, setMessageUpdate] = useState("");
    const [showComments, setShowComments] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const userId = useContext(UserIdContext);
    const dispatch = useDispatch();

    const tweet = props.tweet;

    // Comportements
    const getMessageUpdate = (evt) => { setMessageUpdate(evt.target.value) };
    const changeIsUpdated= () => { setIsUpdated(!isUpdated) };
    const changeShowComments =  () => { setShowComments(!showComments)};

    const handleUpdate = () =>{
        if (messageUpdate){
            dispatch(updateTweet(props.tweet._id, messageUpdate))
        }
        setIsUpdated(false);
    };

    const handleDelete = () => {
        if (window.confirm("Voulez vous vraiment supprimer ce tweet ?")){
            dispatch(deleteTweet(tweet._id));
        }
    };

    const handleLike = () => {
        dispatch(likeTweet(tweet._id, userId));
        setIsLiked(true);
    };

    const handleUnlike = () => {
        dispatch(unlikeTweet(tweet._id, userId));
        setIsLiked(false);
    }

    // permet de savoir si l'utisateur à déjà aimé le message ou non
    useEffect(() => {
        if (tweet.likers.includes(userId)){
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [userId, tweet.likers, isLiked])

    // Affichage
    return (
        <li className="tweet" key={props.key}>
            <div className="tweet-header">
                <div className="userName">
                    <h3>{tweet.authorUserName}</h3>
                    {tweet.authorId !== userData._id && (
                        <FollowHandler userIdToFollow={tweet.authorId} />
                    )}
                </div>
                <span>{dateParser(tweet.createdAt)}</span>
            </div>

            {!isUpdated ? <p>{props.tweet.message}</p> : (
                <div className="update-tweet">
                    <textarea defaultValue={props.tweet.message}
                        onChange={getMessageUpdate} />
                    <button className="btn" onClick={handleUpdate}>
                        Valider Modification
                    </button>
                </div>
            )}

            {userData._id === tweet.authorId && (
                <div className="button-container">
                    <div className="update-icon" onClick={changeIsUpdated}>
                        <img src="./img/update.svg" alt="update" />
                    </div>
                    <div className="delete-icon" onClick={handleDelete}>
                        <img src="./img/delete.svg" alt="delete" />
                    </div>
                </div>
            )}

            <div className="tweet-footer">
                <div className="comment-icon">
                    <img onClick={changeShowComments} src="./img/comment.svg" alt="comment"/>
                </div>

                <div className="like-icon">
                    { userId && !isLiked  && (
                        <img src="./img/like.svg" onClick={handleLike} alt="like" />
                    )}
                    { userId && isLiked && (
                        <img src="./img/unlike.svg" onClick={handleUnlike} alt="unlike" />
                    )}
                </div>
                
            </div>
            {showComments && <ListComment tweet={props.tweet}/>}
        </li>
    );
};

export default Tweet;