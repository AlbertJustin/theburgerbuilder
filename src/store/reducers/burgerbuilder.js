import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
    salad: 0.4,
    cheese: 0.7,
    bacon: 0.5,
    meat: 1.4
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    isPurchasable: false,
    error: false,
    burgerBuilding: false
};

const burgerbuilder = (state = initialState, action) => {
    console.log(action.type);
    switch(action.type) {
        case actionTypes.ADDINGREDIENT:
            return addOrRemoveIngredients(state, action.payload, "ADD");
        case actionTypes.REMOVEINGREDIENT:
            return addOrRemoveIngredients(state, action.payload, "REMOVE");
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ings,
                isPurchasable: false,
                totalPrice: 4,
                error: false,
                burgerBuilding: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
    
};

const checkPurchaseState = (ingredients) => {
    let ingredientsCount = Object.keys(ingredients).map((key) => ingredients[key])
    .reduce((currentVal, nextVal) => {
        return currentVal + nextVal;
    }, 0);
    return ingredientsCount > 0;
}

const addOrRemoveIngredients = (state, payload, addOrRemove) => {
    let updatedIngredients = { ...state.ingredients };
    let price = state.totalPrice;
    switch(addOrRemove) {
        case 'ADD':
            updatedIngredients[payload.type] = updatedIngredients[payload.type] + 1;
            price += INGREDIENT_PRICES[payload.type]
            break;
        case 'REMOVE':
            updatedIngredients[payload.type] = updatedIngredients[payload.type] - 1;
            price -= INGREDIENT_PRICES[payload.type]
            break;
        default:
            break;
    } 
    return {
        ...state,
        ingredients: updatedIngredients,
        totalPrice: price,
        burgerBuilding: true,
        isPurchasable: checkPurchaseState(updatedIngredients)
    };
}

export default burgerbuilder;