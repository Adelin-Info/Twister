import { useState } from 'react';
import api from '../api.js';
import SignIn from './SignIn.js';

function SignUp(){

    // Etats
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");
    const [formSubmit, setFormSubmit] = useState(false);

    // Comportements
    const getUserName = (evt) => { setUserName(evt.target.value) };
    const getEmail = (evt) => { setEmail(evt.target.value) }
    const getFirstName = (evt) => { setFirstName(evt.target.value) };
    const getLastName = (evt) => { setLastName(evt.target.value) };
    const getPassword = (evt) => { setPassword(evt.target.value) };
    const getControlPassword = (evt) => { setControlPassword(evt.target.value) };

    const handleRegister = async (evt) => {
        evt.preventDefault();

        // envoi une requête seulement si les deux mots de passes sont identiques
        if (password == controlPassword){
            try {
                await api.post('/auth/signup', {userName, email, password, firstName, lastName});
                setFormSubmit(true);
            } catch (err) {
                console.log(err);
            }
        }
    };

    // Affichage
    return (
        <>
            { formSubmit ? (
                <>
                    <SignIn />
                    <h4 className='success'>Enregistrement réussi, veuillez-vous connecter</h4>
                </>
            ) : (
                <form action="" id="signup-form" onSubmit={handleRegister}>
                    <label htmlFor="firstname">Prénom</label>
                    <input id="firstname" onChange={getFirstName}/>
                    <label htmlFor="lastname">Nom</label>
                    <input id ="lastname" onChange={getLastName}/>
                    <label htmlFor="email">Email</label>
                    <input id="email" onChange={getEmail}/>
                    <label htmlFor="username">Nom Utilisateur</label>
                    <input id="username" onChange={getUserName}/>
                    <label htmlFor="mdp">Mot de Passe</label>
                    <input id="mdp" type="password" onChange={getPassword}/>
                    <label htmlFor="confirm_mdp">Confirmer Mot de Passe</label>
                    <input id="confirm_mdp" type="password" onChange={getControlPassword}/>
                    <button onClick={handleRegister}>Valider Inscription</button>
                </form>
            )}
        </>
    );
}

export default SignUp;