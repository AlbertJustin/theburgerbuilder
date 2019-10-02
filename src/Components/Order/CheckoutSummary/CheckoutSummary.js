import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./CheckoutSummary.module.css";
import ContactData from "../../../Containers/ContactData/ContactData";
import { Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auxillary from "../../../HOC/Auxillary";

const CheckoutSummary = (props) => {
    let summary = <Redirect to="/" />;
    if(props.ingredients) {
        let redirectToHome = props.purchased ? <Redirect to="/" /> : null;
        summary = (
        <div className={styles.CheckoutSummary}>
            {redirectToHome}
            <h1>Here is your Burger!!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.chkoutCancel} >CANCEL</Button>
            <Button btnType='Success' clicked={props.chkoutContinue}>CONTINUE</Button>
            <Route path={props.match.url + "/contact-data"} component={ContactData} />
        </div>); 
    }
    return (
        <Auxillary>{summary}</Auxillary>);
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps, null)(withRouter(CheckoutSummary));