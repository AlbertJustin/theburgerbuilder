import React from "react";
import Navigationitem from "./NavigationItem/NavigationItem";
import styles from "./NavigationItems.module.css";

const NavigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <Navigationitem link="/">BurgerBuilder</Navigationitem>
        {props.isUserAuth && <Navigationitem link="/orders">Orders</Navigationitem>}
        {
            !props.isUserAuth ? <Navigationitem link="/login">Signup/Login</Navigationitem>
            : <Navigationitem link="/logout">Logout</Navigationitem> 
        }
    </ul>

);

export default NavigationItems;