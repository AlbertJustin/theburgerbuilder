import React from "react";
import Button from "../../Components/UI/Button/Button";
import styles from "./Auth.module.css";
import { authValidate, setAuthRedirectPath } from "../../store/actions/auth";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Aux from "../../HOC/Auxillary";
import { Redirect } from "react-router-dom";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isSignup: true
        };
    }

    componentDidMount() {   
        if(!this.props.burgerBuilding && this.props.redirectPath !== "/") {
            this.props.setAuthRedirectPath();
        }
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: [event.target.value]
        });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuthHandler(this.state.email, this.state.password, this.state.isSignup);
    }

    onClickSwitchHandler = (event) => {
        event.preventDefault();

        this.setState((prevState) => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {
        let formJSX = (
            <div className={styles['auth-form']}>
                <h1>{this.state.isSignup ? 'SignUp' : 'Login'}</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <label>
                        <input className={styles['input-box']} type="email" name="email" 
                        placeholder="Email Address"
                        value={this.state.email} 
                        onChange={this.onChangeHandler} /> 
                    </label>
                    <label>
                        <input className={styles['input-box']} type="password" name="password" 
                        value={this.state.password}   
                        placeholder="Password"
                        onChange={this.onChangeHandler} />
                    </label>
                    <Button btnType='Success'>Submit</Button>
                    <button onClick={this.onClickSwitchHandler} className={styles.switch}>
                        Switch to {this.state.isSignup ? 'login' : 'Signup'}
                    </button>
                </form>
            </div>
        );

        if(this.props.loading) {
            formJSX = <Spinner />;
        }


        return (
            <Aux>
                {this.props.isUserAuthenticated ? <Redirect to={this.props.redirectPath} /> : formJSX}
            </Aux>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        isUserAuthenticated: state.auth.token != null,
        errorMessage: state.auth.error,
        redirectPath: state.auth.redirectPath,
        burgerBuilding: state.burgerBuilder.burgerBuilding
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthHandler: (email, password, isSignup) => dispatch(authValidate(email, password, isSignup)),
        setAuthRedirectPath: () => dispatch(setAuthRedirectPath("/"))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);