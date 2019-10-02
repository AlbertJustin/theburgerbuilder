import React from "react";
import BurgerLogo from "../../../Assets/Images/burger-logo.png";
import styles from "./Logo.module.css";

const Logo = (props) => (
    <div className={styles.Logo}>
        <img src={BurgerLogo} alt="Burger" />
    </div>
);

export default Logo;