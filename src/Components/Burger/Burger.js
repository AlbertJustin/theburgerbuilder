import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import styles from "./Burger.module.css";
import { connect } from "react-redux";

const Burger = (props) => {
    
    let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => [...Array(props.ingredients[igKey])].map((_, i) => 
        <BurgerIngredients key={igKey+i} type={igKey} />)
    )
    .reduce((currentValue, nextValue) => {
        return currentValue.concat(nextValue);
    }, []);

    if (transformedIngredients.length === 0)
    {
        transformedIngredients = <p>Please add the ingredients</p>;
    }
    
    return (
        <div className={styles.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients
    };
};

export default connect(mapStateToProps, null)(Burger);