import * as  actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingType) => {
    return {
        type: actionTypes.ADDINGREDIENT,
        payload: { type: ingType }
    };
};

export const removeIngredient = (ingType) => {
    return {
        type: actionTypes.REMOVEINGREDIENT,
        payload: { type: ingType }
    };
};

const updateIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ings: ingredients
    };
};

export const setIngredients = () => {
    return (dispatch) => {
        axios.get("/ingredients.json")
        .then((response) => {
            dispatch(updateIngredients(response.data));
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.FETCH_INGREDIENTS_FAILED,
                error: true
            });
        });
    };
};              