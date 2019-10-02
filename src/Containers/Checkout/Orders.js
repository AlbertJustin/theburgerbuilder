import React, { Component } from 'react';
import Order from "../../Components/Order/Order";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/orders";
import { connect } from "react-redux";
import WithErrorHandler from "../../HOC/WithErrorHandler";
import axios from "../../axios-orders";

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.authToken, this.props.userId);
    }
b
    render() {
        console.log(this.props);
        let orders = this.props.orders.map((order, i) => <Order key={i} ing={order.ingredients} price={order.price} />);
        if(this.props.loading) {
            orders = <Spinner />;
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        authToken: state.auth.token,
        userId: state.auth.userid
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));