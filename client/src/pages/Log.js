import { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

// Page de Cd'authentification
function Log(){ 

    // Etats
    const [signInModals, setSignInModals] = useState(true);
    const [signUpModals, setSignUpModals] = useState(false);

    // Comportements

    //Permet de basculer entre le formulaire d'inscription et de connexion
    const handleModals = (evt) => {
        if (evt.target.id == "register") {
            setSignUpModals(true);
            setSignInModals(false);
        }
        else if (evt.target.id == "login") {
            setSignUpModals(false);
            setSignInModals(true);
        }
    }

    // Affichage
    return (
        <div className="log-page">
            <div className="log-form">
            <ul>
                <li onClick={handleModals} 
                    id="login" 
                    className={signInModals ? "active-btn": null}
                >Se connecter</li>

                <li onClick={handleModals} 
                    id="register" 
                    className={signUpModals ? "active-btn": null}
                >S'inscrire</li>
            </ul>
            {signUpModals && <SignUp />}
            {signInModals && <SignIn />}
            </div>
        </div>
    );
}

export default Log;