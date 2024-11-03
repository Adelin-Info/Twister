import { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { UserIdContext } from "./UserIdContext";
import { useSelector } from "react-redux";
import SignOut from "./SignOut";

// Header qui est présent tout au long du site, permettant le changement de page
function Header(){
    const userId = useContext(UserIdContext);
    const userData = useSelector((state) => state.userReducer);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/home">
                        <img src="./public/logo192.png" alt="logo" />
                        <h3>Twister</h3>
                    </NavLink>
                </div>
                { userId && (
                    <ul>
                        <li className="userName">
                            <NavLink exact to="/profil">
                                <h5>{userData.userName}</h5>
                            </NavLink>
                        </li>
                        <SignOut />
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Header;