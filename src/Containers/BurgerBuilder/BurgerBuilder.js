import React, { Component } from "react";
import Auxillary from "../../HOC/Auxillary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import WithErrorHandler from  "../../HOC/WithErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/burgerbuilder";
import { purchaseInit } from "../../store/actions/orders";
import { setAuthRedirectPath } from "../../store/actions/auth";

class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickOrdered: false
        };
        this.clickOrderedHandler = this.clickOrderedHandler.bind(this);
        this.closeOrderSummaryHandler = this.closeOrderSummaryHandler.bind(this);
        this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this);
    }

    clickOrderedHandler() {
        if(this.props.isUserAuthenticated) {
            this.setState({clickOrdered: true});
        } else {
            if(this.props.burgerBuilding) {
                this.props.setAuthRedirectPath("/checkout");
            }
            this.props.history.push("/login");
        }
    }

    closeOrderSummaryHandler() {
        this.setState({clickOrdered: false});
    }

    purchaseContinueHandler() {
        this.props.history.push({
            pathname: "/checkout"
        });
    }

    componentDidMount() {
        this.props.onAddIngredient();
        this.props.onBurgerPurchased();
    }

    render() {
        let orderSummary = null;
        let burger = this.props.error ? <p style={{textAlign: 'center'}}>ingredients can't be loaded!</p> :<Spinner />;

        if(this.props.ingredients) {
            orderSummary =  <OrderSummary  
            purchaseContinue = {this.purchaseContinueHandler} 
            purchaseCancel = {this.closeOrderSummaryHandler} />;
    
            burger = <Auxillary>
                <Burger/>
                    <BuildControls 
                    ingredientAdded={this.props.addIngredientHandler}
                    ingredientRemoved = {this.props.removeIngredientHandler} 
                    ordered = {this.clickOrderedHandler}
                    isAuthenticated = {this.props.isUserAuthenticated} />
            </Auxillary>;
        }

        return (
            <Auxillary>
                <Modal show={this.state.clickOrdered} closeModal={this.closeOrderSummaryHandler}>
                    {orderSummary}                    
                </Modal>
                {burger}
            </Auxillary>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuildertotalPrice,
        isPurchasable: state.burgerBuilderisPurchasable,
        error: state.burgerBuilder.error,
        isUserAuthenticated: state.auth.token != null,
        burgerBuilding: state.burgerBuilder.burgerBuilding
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingType) => dispatch(burgerBuilderActions.addIngredient(ingType)),
        removeIngredientHandler: (ingType) => dispatch(burgerBuilderActions.removeIngredient(ingType)),
        onAddIngredient: () => dispatch(burgerBuilderActions.setIngredients()),
        onBurgerPurchased: () => dispatch(purchaseInit()),
        setAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    };
};

export default  connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));