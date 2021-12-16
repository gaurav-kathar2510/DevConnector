import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAutheticated: null,
    loading: true,
    user: null
}

 function authtemp(state = initialState, action){

    const{type, payload} = action;

    switch(type){
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                ...payload,
                isAutheticated: true,
                loading: false
            }

        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAutheticated: false,
                loading: false
            }

        default:
            return state;
    }


}

export default authtemp;