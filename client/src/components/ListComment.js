import Comment from './Comment';
import { addComment, getAllTweets } from '../actions/tweet';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function ListComment(props) {
    // Etat
    const [text, setText] = useState("");
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const tweet = props.tweet;

    // Comportement
    const getText = (evt) => { setText(evt.target.value) };

    const handleComment = (evt) => {
        evt.preventDefault();
        if (text) {
            dispatch(addComment(tweet._id, userData._id, userData.userName, text))
                .then(() => dispatch(getAllTweets()))
                .then(() => setText(""));
        }
    };
    //Affichage
    return (
        <div className="list-comment">
            <ul>
                { 
                    props.tweet.comments.map((comment) => {
                        return <Comment comment={comment} key={comment._id} tweet={props.tweet}/>
                    })
                }
            </ul>
            <div className='new-comment'>
                {userData._id && (
                    <form action="" onSubmit={handleComment} className="new-comment-form">
                        <textarea id="new-comment-text" onChange={getText} row="4" cols="50" placeholder='Commentaire'/>
                        <button type="submit">Ajouter Commentaire</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default ListComment;