import React from "react";
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import Container from '@material-ui/core/Container';

import Home from './Pages/Home';
import About from './Pages/About';
import Faq from './Pages/Faq';
import Navbar from './Pages/Navigation/Navbar';
import AuthorizedRoute from './Pages/Navigation/AuthorizedRoute';
import SignIn from './Pages/Auth/SignIn'
import Register from "./Pages/Auth/Register";
import ListOrders from "./Pages/OrderModules/ListOrders";
// import CreatePlan from "./Pages/PlanModules/CreatePlan";
// import ManagePlan from "./Pages/PlanModules/ManagePlan";
import OrderForm from "./Pages/OrderModules/OrderForm";
import ManageOrder from "./Pages/OrderModules/ManageOrder";
import Dashboard from "./Pages/UserModules/Dashboard";
import WalletHistory from "./Pages/WalletModules/WalletHistory";
import ManageWallets from "./Pages/WalletModules/ManageWallets";

import RecipientForm from "./Pages/PaymentModules/RecipientForm";
import ManageRecipients from "./Pages/PaymentModules/ManageRecipients";

import MerchantForm from './Pages/MerchantModules/MerchantForm';
import UserMerchantList from './Pages/MerchantModules/UserMerchantList';
import ManageMerchant from './Pages/MerchantModules/ManageMerchant';

import Shop from './Pages/ShopModules/Shop';

import { getUserProfile } from './Services/Api/user';
import { hasToken } from './Services/Api/authentication';

import './CSS/styles.css';
class App extends React.Component {
    constructor (props){
        super(props);

        this.state = {
            authenticated: hasToken(),
            user: null,
            getProfileAttempts: 0
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.authenticated && prevState.user == null)
        {
            this.loadUser();
        }
    }

    loadUser = () => {

        const getProfileTask = getUserProfile();
        if(getProfileTask != null) {
            getProfileTask.then(profile => {
                // const hasAuthToken = hasToken();
                if(profile == null) {
                    this.setState({
                        authenticated: false,
                        user: null
                    });
                } else {
                    this.setState({
                        authenticated: true,
                        user: profile
                    });
                }
            });
        }
    }

    authenticationStatus = (status) => {
        if(status == true) {
            this.setState({
                authenticated: hasToken()
            });
        } else {
            this.setState({
                authenticated: false
            });
        }
    }

    render() {
        const currentYear = new Date().getFullYear();
        return (
            <div>
                <div className={"body-container"}>
                    <Router>
                        <Navbar authenticated={this.state.authenticated} authenticationStatus={this.authenticationStatus}/> 
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route path="/faq" component={Faq} />

                            <Route path={"/shop"} component={Shop} />
                            
                            <AuthorizedRoute path={"/merchant/manage"} component={ManageMerchant} redirect={"/auth/signin"} {...this.state}  {...this.props} />
                            <AuthorizedRoute path={"/merchant/create"} component={MerchantForm} redirect={"/auth/signin"} {...this.state}  {...this.props} />
                            <AuthorizedRoute path={"/merchant/list"} component={UserMerchantList} redirect={"/auth/signin"} {...this.state}  {...this.props} />

                            <AuthorizedRoute path={"/order/list"} component={ListOrders} redirect={"/auth/signin"} {...this.state}  {...this.props} />
                            <AuthorizedRoute path={"/order/create"} component={OrderForm} redirect={"/auth/signin"} {...this.state}  {...this.props} />
                            <AuthorizedRoute path={"/order/manage"} component={ManageOrder} redirect={"/auth/signin"} {...this.state}  {...this.props} />
                            
                            <AuthorizedRoute path={"/wallet/manage"} component={ManageWallets} redirect={"/auth/signin"} {...this.state}  {...this.props} />
                            <AuthorizedRoute path={"/wallet/history"} component={WalletHistory} redirect={"auth/signin"} {...this.state}  {...this.props} />
                            <AuthorizedRoute path={"/recipient/manage"} component={ManageRecipients} redirect={"/auth/signin"} {...this.state}  {...this.props} />
                            <AuthorizedRoute path={"/recipient/create"} component={RecipientForm} redirect={"/auth/signin"} {...this.state}  {...this.props} />
                            <AuthorizedRoute path={"/recipient/update"} component={RecipientForm} redirect={"/auth/signin"} {...this.state}  {...this.props} />

                            <AuthorizedRoute path={"/user/dashboard"} component={Dashboard} redirect={"/auth/signin"} {...this.state} {...this.props} />
                            <Route path="/auth/signin" render={(props) => (this.state.authenticated ? 
                                <Redirect to="/" /> : <SignIn {...props} setAuthenticationStatus={this.authenticationStatus} /> )} />
                            <Route path="/auth/register" render={(props) => (this.state.authenticated ?
                                <Redirect to="/" /> : <Register {...props} setAuthenticationStatus={this.authenticationStatus} />)} />
                        </Switch>
                    </Router>
                </div>
                <footer>
                    <p>Copyright { currentYear} - Cravour Solutions</p>
                </footer>
            </div>
        );
    }
}

export default hot(App);