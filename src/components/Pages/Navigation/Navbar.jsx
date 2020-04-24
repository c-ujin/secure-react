import React from 'react';
import ReactDOM from 'react-dom';

import MenuBurger from '../../../assets/SVG/MenuBurger';
import ProfileIcon from '../../../assets/Images/ProfileIcon.png';
import UnsignedUserIcon from '../../../assets/Images/UnsignedUserIcon.png';

import { signOut } from '../../Services/Api/authentication';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayLeftNav: false,
            displayRightNav: false,
        };

        //event listener for capturing external navigation menu clicks
        document.addEventListener('click', this.closeNavigationMenu("displayLeftNav"), false);
        document.addEventListener('click', this.closeNavigationMenu("displayRightNav"), false);
    }

    componentWillUnmount() {
        // make sure you remove the listener when the component is destroyed
        document.removeEventListener('click', this.closeNavigationMenu("displayLeftNav"), false);
        document.removeEventListener('click', this.closeNavigationMenu("displayRightNav"), false);
    }

    signOut = (e) => {
        e.preventDefault();
        signOut().then(response => {
            this.props.authenticationStatus(false);
        });
    }

    toggleNavigationMenu = (displayNav) => (e) => {
        e.preventDefault();
        //toggle menu
        this.setState({
            [displayNav]: !this.state[displayNav]
        });
    }

    closeNavigationMenu = (displayNav) => (e) => {

        if(this.state[displayNav]) {
            const clickedElement = ReactDOM.findDOMNode(this).contains(e.target)
            if(!clickedElement || clickedElement && this.state[displayNav]) {
                // the click was outside your component, so handle closing here
                this.setState({
                    [displayNav]: false
                });
            }
        }
    }

    authMenu = (displayClass) => this.props.authenticated ?
        <div className={`right-navbar ${displayClass}`}>
            <a href={"/wallet/manage"}>Dashboard</a>
            <a href={"/auth/signout"} onClick={this.signOut}>Sign Out</a>   
        </div> :
        <div className={`right-navbar ${displayClass}`}>
            <a href={"/auth/register"}>Create an Account</a>
            <a href={"/auth/signin"}>Sign In</a>
        </div>

    mobileMenu = (displayClass) => {
        return (
            <div className={`mobile-nav-menu ${displayClass}`}>
                <a href="/order/create">Create Order</a>
                <a href="/order/list">View Your Orders</a>
                <a href="/wallet/manage">Manage Wallet</a>
                <a href="/recipient/manage">Manage Recipients</a>
                <a href="/wallet/history">Wallet History</a>
                {/* <a href={"/about"}>About</a>
                <a href="/faq">Faq</a> */}
            </div>
        );
    }

    leftNavbar = () => {
        return (<div className="left-navbar">
            <a href={"/about"}>ABOUT</a>
            <a href="/faq">FAQ</a>
        </div>);
    }

    render() {

        const leftNavDisplay = this.state.displayLeftNav ? "display-nav" : "";
        const rightNavDisplay = this.state.displayRightNav ? "display-nav" : "";

        const userIcon = this.props.authenticated ? ProfileIcon : UnsignedUserIcon;
        return (
            <div className="navigation-container">
                <div className={"logo-container"}>
                    <a href="/">
                        <div>
                            <img src="https://res.cloudinary.com/ev3n72av12/image/upload/v1576776800/Cravour/Site/cravour-logo-b.png"/>
                        </div>
                    </a>
                </div>
                <a href="" className="nav-menu-icon" onClick={this.toggleNavigationMenu("displayLeftNav")}>
                    <MenuBurger />
                </a>
                <a href="" className="nav-user-icon" onClick={this.toggleNavigationMenu("displayRightNav")}>
                    <img src={userIcon} />
                </a>
                {/* {this.leftNavbar()} */}
                {this.mobileMenu(leftNavDisplay)}
                {this.authMenu(rightNavDisplay)}
            </div>
        );
    }
}

export default Navbar;