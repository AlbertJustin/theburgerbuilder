import React from "react";
import styles from "./Order.module.css";

const Order = (props) => {
    let ingredients = [];
    for(let key in props.ing) {
        ingredients.push(key + " (" + props.ing[key] + ")");
    }

    return (
        <div className={styles.Order}>
            <p><strong>Ingrdients:</strong> {ingredients.join(", ")}</p>
            <p><strong>Price: </strong>$ {Number(props.price).toFixed(2)}</p>
        </div>

    );
}

export default Order;