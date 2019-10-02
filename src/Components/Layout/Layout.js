import React, { Component } from "react";
import Auxillary from "../../HOC/Auxillary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import styles from "./Layout.module.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleSideDrawer: false
        };
    }

    sideDrawerBackdropClickHandler = () => {
        this.setState({
            toggleSideDrawer: !this.state.toggleSideDrawer
        });
    }
    
    render() {
        return (
            <Auxillary>
                <Toolbar isUserAuth={this.props.isAuthenticated} 
                clicked={this.sideDrawerBackdropClickHandler} />
                <SideDrawer 
                show={this.state.toggleSideDrawer} 
                clicked={this.sideDrawerBackdropClickHandler} 
                isUserAuth={this.props.isAuthenticated} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Auxillary>
    
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null
    };
};

export default connect(mapStateToProps)(Layout);