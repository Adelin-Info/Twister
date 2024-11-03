import { combineReducers } from 'redux';
import userReducer from './user.js';
import tweetReducer from './tweet.js';

export default combineReducers({
    userReducer,
    tweetReducer,
});