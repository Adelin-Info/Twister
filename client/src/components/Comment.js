import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timestampParser } from "./Utils";
import { deleteComment, updateComment } from "../actions/tweet";
import FollowHandler from "./FollowHandler";
import { UserIdContext } from "./UserIdContext";

function Comment(props){
    // Etat
    const [isAuthor, setIsAuthor] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [text, setText] = useState("");
    const userData = useSelector((state) => state.userReducer);
    const userId = useContext(UserIdContext);
    const dispatch = useDispatch;
    
    const comment = props.comment;
    const tweet = props.tweet;

    //Comportement
    const getText = (evt) => { setText(evt.target.value) };
    const changeIsUpdated = () => { setIsUpdated(!isUpdated) };

    const handleUpdate = (evt) => {
        evt.preventDefault();
        if (text) {
            dispatch(updateComment(tweet._id, comment._id, text));
            setText("");
            setIsUpdated(false);
        }
    };

    const handleDelete = () => {
        if (window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")){
            dispatch(deleteComment(tweet._id, comment._id));
        }
    }

    // Permet de savoir si ce commentaire est de l'utilisateur connecté ou non
    useEffect(() => {
        const checkAuthor = () => {
            if (userId == comment.commenterId){
                setIsAuthor(true);
            }
        };
        checkAuthor();
    }, [userId, comment.commenterId]);

    // Affichage
    return (
        <div className="comment" key={props.key}>
            <div className="comment-header">
                <div className="userName">
                    <h3>{comment.commenterUserName}</h3>
                    {comment.commenterId != userData._id && (
                        <FollowHandler userIdToFollow={comment.commenterId}/>
                    )}
                </div>
            </div>
            <p>{comment.text}</p>
            <div className="update-comment">
                {isAuthor && !isUpdated ? (
                    <span onClick={changeIsUpdated}>
                        <img src="./img/icons/update.svg" alt="update-comment"/>
                    </span>
                ) : (
                    <form action="" onSubmit={handleUpdate} className="update-comment-form">
                        <label htmlFor="text" onClick={changeIsUpdated}>Modifier</label>
                        <input id="text" onChange={getText}/>
                        <div className="delete-btn">
                            <span onClick={handleDelete}>
                                <img src="./img/icons/delete.svg" alt="delete-comment"/>
                            </span>
                            <button type="submit">Valider Modification</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
};

export default Comment;