import { NEW_POST, FETCH_POSTS, CLEAR_POSTS, POST_MODAL} from '../actions/types';

const initialState = {
    items: [],
    item: {},
    hasMore: true,
    postModal: []
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_POSTS:
            return{
                ...state, 
                items: state.items.concat(action.payload.content),
                hasMore: !action.payload.last
            }
        case NEW_POST:
            return{
                ...state,
                item: action.payload
            }
        case POST_MODAL:
            return{
                ...state,
                postModal: action.payload
            }
        case CLEAR_POSTS:
            return{
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}

