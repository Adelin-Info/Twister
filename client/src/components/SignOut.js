import axios from "axios";
import cookie from 'js-cookie';

function SignOut(){
    // Comportements
    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expires: 1 });
        }
    };

    const handleLogout = async () => {
        await axios({
            method: "get",
            url: "http://localhost:5000/api/auth/signout",
            withCredentials: true,
        })
            .then(() => removeCookie("jwt"))
            .catch((err) => console.log(err));
        window.location = "/";
    };

    // Affichage
    return (
        <li onClick={handleLogout}>
            <h5>Déconnexion</h5>
        </li>
    );
}

export default SignOut;