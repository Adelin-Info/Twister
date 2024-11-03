import { useState } from 'react';
import axios from 'axios';

function SignIn(){

    // Etats
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Comportement
    const getEmail = (evt) => {setEmail(evt.target.value)};
    const getPassword = (evt) => {setPassword(evt.target.value)};

    const handleLogin = (evt) => {
        evt.preventDefault();
        axios({
            method: "post",
            url: 'http://localhost:5000/api/auth/signin',
            withCredentials: true,
            data: {
                email,
                password
            }
        })
            .then ((res) => {
                console.log(res);
                window.location = "/home";
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Affichage
    return (
        <form action="" id="signin-form" onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input id="email" onChange={getEmail}/>
            <div className="email_error"></div>
            <label htmlFor="mdp">Mot de Passe</label>
            <input id="mdp" type="password" onChange={getPassword}/>
            <div className="mdp_error"></div>
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default SignIn;