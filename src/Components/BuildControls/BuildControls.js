import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { connect } from "react-redux";

const controls = [
    {label: "bacon", type:"bacon"},
    {label: "meat", type:"meat"},
    {label: "cheese", type:"cheese"},
    {label: "salad", type:"salad"}
];

const BuildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p>Burger Price: <strong>{props.price.toFixed(2)}$</strong></p>
            {controls.map((ctrl) => <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            buttonEnable={props.ingredients[ctrl.type] > 0}
            added={() => props.ingredientAdded(ctrl.type) } 
            removed= {() => props.ingredientRemoved(ctrl.type)}/>)}
            <button className={styles.OrderButton} 
            disabled={!props.isPurchasable} 
            onClick={props.ordered}>{props.isAuthenticated ? 'ORDER' : 'SIGN UP TO CONTINUE'}</button>
        </div>);
}

const mapStateToProps = (state) => {
    return { 
        price: state.burgerBuilder.totalPrice,
        isPurchasable: state.burgerBuilder.isPurchasable,
        ingredients: state.burgerBuilder.ingredients
    };
};

export default connect(mapStateToProps, null)(BuildControls);