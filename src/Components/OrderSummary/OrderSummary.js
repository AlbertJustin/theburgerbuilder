import React from "react";
import Auxillary from "../../HOC/Auxillary";
import Button from "../UI/Button/Button";
import { connect } from "react-redux";

const OrderSummary = (props) => {
    let ingredients = Object.keys(props.ingredients)
    .map((key) => {
        return <li key={key}>
            <span style={{testTransform: 'capitalize'}}>{key}:</span> {props.ingredients[key]} 
        </li>;
    });
    return (
        <Auxillary>
            <h3>Your Order</h3>
            <p><strong>Total Price:</strong> {props.price.toFixed(2)}$</p>
            <p>Your delicious Burger with following Ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Wish to Checkout?</p>
            <Button clicked={props.purchaseContinue} btnType="Success">Continue</Button>
            <Button clicked={props.purchaseCancel} btnType="Danger">Cancel</Button>
        </Auxillary>
    );

}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    };
};

export default connect(mapStateToProps, null)(OrderSummary);