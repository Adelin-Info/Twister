import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

// Redux
import { Provider } from 'react-redux';
import { applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers/reducer.js'
import { getAllUsers } from './actions/user';
import { getAllTweets } from './actions/tweet';
import { BrowserRouter } from 'react-router-dom';

// Création du magasin de données
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))
);

// Récupération de tout les utilisateurs et les messages de la bd puis les stock dans le magasin 
store.dispatch(getAllUsers);
store.dispatch(getAllTweets);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
