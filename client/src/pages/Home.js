import ListTweet from '../components/ListTweet.js';

// Page d'accueil du site
function Home(){

    // devait également contenir une liste de suggestion d'ami

    return (
        <div className="home-page">
            <div className="main">
                <ListTweet />
            </div>
        </div>
    );
}

export default Home;