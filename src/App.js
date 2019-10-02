import React, { useEffect } from 'react';
import './App.css';
import Layout from "./Components/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Checkout from "./Containers/Checkout/Checkout";
import Orders from "./Containers/Checkout/Orders";
import Auth from "./Containers/Auth/Auth";
import Logout from "./Containers/Auth/Logout";
import { checkAuthLocalStorage } from "./store/actions/auth";
import { connect } from "react-redux";

const App = (props) => {

  const { checkAuthLocalStore } = props;
  useEffect(() => {
    checkAuthLocalStore();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/login" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthLocalStore: () => dispatch(checkAuthLocalStorage())
  };
};

export default connect(null, mapDispatchToProps)(App);
