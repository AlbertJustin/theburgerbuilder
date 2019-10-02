import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.push("/checkout/contact-data");
    }

    render() {
        return <CheckoutSummary 
        chkoutCancel={this.checkoutCancelHandler}
        chkoutContinue={this.checkoutContinueHandler} />;
    }
}


export default Checkout;