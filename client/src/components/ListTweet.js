import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTweet, getAllTweets } from "../actions/tweet.js";
import Tweet from "./Tweet.js";
import { isEmpty } from "./Utils.js";

function ListTweet(){
    const [loadTweets, setLoadTweets] = useState(true);
    const [message, setMessage] = useState("");
    const tweets = useSelector((state) => state.tweetReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    // Comportement
    const getMessage = (evt) => { setMessage(evt.target.value) };

    const handleTweet = (evt) => {
        evt.preventDefault();
        if (message) {
            dispatch(addTweet(userData._id, userData.userName, message))
            .then(() => dispatch(getAllTweets()))
            .then(() => setMessage(""))
        };
    };

    // Permet scroll plus et de charger de nouveaux messages
    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
            setLoadTweets(true);
        }
    }

    useEffect(() => {
        if (loadTweets){
            dispatch(getAllTweets());
            setLoadTweets(false);
        }

        window.addEventListener("scroll", loadMore);
        return () => window.removeEventListener("scroll", loadMore);
    }, [loadTweets, dispatch]);

    return (
        <section>
            <div className="new-tweet">
                <form action="" className= "new-tweet-form" onSubmit={handleTweet}>
                    <textarea id="new-tweet-message" row="4" cols="50" placeholder="Quoi de neuf ?" onChange={getMessage}/>
                    <button type="submit">Ajouter Tweet</button>
                </form>
            </div>
            <div className="list_tweet">
                <ul>
                    {!isEmpty(tweets[0]) &&
                        tweets.map((tweet) => {
                            return <Tweet tweet={tweet} key={tweet._id}/>
                        })
                    }
                </ul>
            </div>
        </section>
    )
}

export default ListTweet;