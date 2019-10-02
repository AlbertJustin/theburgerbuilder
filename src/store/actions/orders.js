import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

const purchaseBurgerSuccess = (orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData: orderData
    };
};

const purchaseBurgerFail = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL
    };
};

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const purchaseBurger = (orderInfo, token) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json?auth=" + token, orderInfo)
        .then((response) => {
            dispatch(purchaseBurgerSuccess(orderInfo));
        })
        .catch((error) => {
            dispatch(purchaseBurgerFail());
        });
    };
};

const fetchOrdersSuccess = (orderData) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orderData
    };
};

const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    };
};

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = (authToken, userId) => {
    return (dispatch) => {
        dispatch(fetchOrderStart());
        axios.get("/orders.json?auth=" + authToken)
        .then((response) => {
            let ordersArray = [];
            for(let key in response.data) {
                const orderData = response.data[key];
                if(orderData.userId === userId) {
                    ordersArray.push(response.data[key]);
                }
            }
            dispatch(fetchOrdersSuccess(ordersArray));
        })
        .catch((error) => {
            dispatch(fetchOrdersFail());
        });    
    };
};