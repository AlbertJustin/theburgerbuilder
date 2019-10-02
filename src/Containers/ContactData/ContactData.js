import React, { Component } from "react";
import styles from "./ContactData.module.css";
import Modal from "../../Components/UI/Modal/Modal";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Auxillary from "../../HOC/Auxillary";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as orderActions from "../../store/actions/orders";


class ContactData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: {
                name: {
                    value: "",
                    validation: {
                        required: true
                    },
                    isValid: false,
                    touched: false,
                    shouldValidate: true
                },
                email: {
                    value: "",
                    validation: {
                        required: true
                    },
                    isValid: false,
                    touched: false,
                    shouldValidate: true
                },
                street: {
                    value: "",
                    validation: {
                        required: true
                    },
                    isValid: false,
                    touched: false,
                    shouldValidate: true
                },
                zipCode: {
                    value: "",
                    validation: {
                        required: true,
                        minLength: 6,
                        maxLength: 6
                    },
                    isValid: false,
                    touched: false,
                    shouldValidate: true
                },
                country: {
                    value: "",
                    validation: {
                        required: true
                    },
                    isValid: false,
                    touched: false,
                    shouldValidate: true
                },
                deliveryType: {
                    value: "Fastest",
                    isValid: true,
                    shouldValidate: false
                }
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid; 
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (event) => {
        let customer = {...this.state.customer};
        let propertyInfo = {...customer[event.target.name]}
        propertyInfo.value = event.target.value;
        if(propertyInfo.shouldValidate) {
            propertyInfo.isValid = this.checkValidity(event.target.value, propertyInfo.validation);
            propertyInfo.touched = true;
        }
        customer[event.target.name] = propertyInfo;
        this.setState({
            customer: customer
        });
    }

    orderHandler = (event) => {
        event.preventDefault();

        let orderDetails = {
            ingredients: {...this.props.ingredients},
            price: this.props.price,
            customer: {
                name: this.state.customer.name.value,
                address: {
                    street: this.state.customer.street.value,
                    zipCode: this.state.customer.zipCode.value,
                    country: this.state.customer.country.value
                },
                email: this.state.customer.email.value,
                deliveryType: this.state.customer.deliveryType.value
            },
            userId: this.props.userId
        };

        this.props.onOrderBurger(orderDetails, this.props.authToken);
    }

    render() {
        let buttonEnable = true;
        buttonEnable = Object.keys(this.state.customer).map((key) => this.state.customer[key].isValid)
        .reduce((currentValue, nextValue) => {
            return currentValue && nextValue;
        }, buttonEnable);
        return (
            <Auxillary>
                <Modal show={this.props.loading} closeModal={null}>
                    <Spinner />
                </Modal>
                <div className={styles.ContactData}>
                    <h3>Enter Your Contact Info</h3>
                    <form>
                        <input className={!this.state.customer.name.isValid && this.state.customer.name.touched ? styles.isValid : null} type="text" name="name" value={this.state.customer.name.value} placeholder="Your Name" onChange={this.onChangeHandler} />
                        <input className={!this.state.customer.email.isValid && this.state.customer.email.touched ? styles.isValid : null} type="email" name="email" value={this.state.customer.email.value} placeholder="Your Mail" onChange={this.onChangeHandler} />
                        <input className={!this.state.customer.street.isValid && this.state.customer.street.touched ? styles.isValid : null} type="text" name="street" value={this.state.customer.street.value} placeholder="Street" onChange={this.onChangeHandler} />
                        <input className={!this.state.customer.country.isValid && this.state.customer.country.touched ? styles.isValid : null} type="text" name="country" value={this.state.customer.country.value} placeholder="Country" onChange={this.onChangeHandler} />
                        <input className={!this.state.customer.zipCode.isValid && this.state.customer.zipCode.touched ? styles.isValid : null} type="text" name="zipCode" value={this.state.customer.zipCode.value} placeholder="Postal Code" onChange={this.onChangeHandler} />
                        <select name="deliveryType" value={this.state.customer.deliveryType.value} onChange={this.onChangeHandler}>
                            <option>Fastest</option>
                            <option>Cheapest</option>
                        </select>
                        <button className={styles.OrderButton} 
                        disabled={!buttonEnable} onClick={this.orderHandler} >ORDER</button>
                    </form>
                </div>
            </Auxillary>
        );
    }
} 

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        authToken: state.auth.token,
        userId: state.auth.userid
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderInfo, token) => dispatch(orderActions.purchaseBurger(orderInfo, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));