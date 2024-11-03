import { Routes, Route} from 'react-router-dom';
import Home from '../pages/Home.js';
import Profil from '../pages/Profil.js';
import Header from './Header.js';
import Log from '../pages/Log.js';

// Navigation sur les différentes pages
function Router(){
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/home" element= {<Home />} /> 
                <Route path="/" element= {<Log />} />
                <Route path="/profil" element= {<Profil />} />
            </Routes>
        </div>
    );
}

export default Router;