import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (userId, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        id: userId,
        token: token
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const checkAuthLocalStorage = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if(token) {
            const expirationDate =  localStorage.getItem("expirationDate");
            if(expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(userId, token));
                dispatch(clearTokenOnExpiresTime((new Date(expirationDate).getTime() - new Date().getTime())/1000));
            }
        }
    };
};

const clearTokenOnExpiresTime = (expiresIn) => {
    return (dispatch) => {
        setTimeout(()=> dispatch(authLogout()) ,expiresIn * 1000);
    };
}; 

export const authValidate = (email, password, isSignup) => {
    
    const authData = {
        "email": "" + email,
        "password": "" +  password,
        "returnSecureToken": true
    };
    

    return (dispatch) => {
        dispatch(authStart());
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZHfkcTN8VwVzfKlV7eEa0OhoQyKeeICg";
        if(!isSignup) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZHfkcTN8VwVzfKlV7eEa0OhoQyKeeICg";
        }
        axios.post(url, authData)
        .then((response) => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem("userId", response.data.localId);
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("expirationDate", expirationDate);
            dispatch(authSuccess(response.data.localId, response.data.idToken));
            dispatch(clearTokenOnExpiresTime(response.data.expiresIn));          
        })
        .catch((error) => {
            dispatch(authFail());
            console.log(error.response);
        });
    };
};