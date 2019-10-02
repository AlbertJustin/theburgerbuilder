import * as actionTypes from "../actions/actionTypes";

const initialState = {
    loading: false,
    token: null,
    error: null,
    userid: null,
    redirectPath: "/"
};

const auth = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return updateState(state, {loading: true, error: null});
        case actionTypes.AUTH_SUCCESS:
            return updateState(state, {loading: false, token: action.token, userid: action.id,
                error: null});
        case actionTypes.AUTH_FAIL:
                return updateState(state, {loading: false, token: null, userid: null,
                    error: null});
        case actionTypes.AUTH_LOGOUT:
            return updateState(state, {loading: false, token: null, error: null, userid: null});
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return updateState(state, { redirectPath: action.path });
        default:
            return state;
    }
 };

function updateState(originalObject, updatedObject) {
    return {
        ...originalObject,
        ...updatedObject
    };
}

export default auth;