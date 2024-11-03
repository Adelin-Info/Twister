import { 
    GET_USER_INFO, 
    GET_ALL_USERS,
    FOLLOW_USER,
    UNFOLLOW_USER
} from "../actions/user";

const initialState = {};

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case GET_USER_INFO:
            return action.payload;

        case GET_ALL_USERS:
            return action.payload;
        
        case FOLLOW_USER:
            return {
                ...state,
                followings: [action.payload.userIdToFollow, ...state.followings]
            };
        
        case UNFOLLOW_USER:
            return {
                ...state,
                followings: state.followings.filter((id) => id != action.payload.userIdToUnfollow)
            };
            
        default:
            return state;
    }
}