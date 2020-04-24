import React from 'react';
import { registerUser } from '../../Services/Api/authentication';

import TextBox from '../Shared/Controls/FormTextbox';
import Button from '../Shared/Controls/FormButton';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            confirmEmail: "",
            password: "",
            confirmPassword: "",
            showErrorBanner: false,
            validateOnChange: false //proactively validate the form
        };
    }

    formIsValid = () => {
        return [
            this.inputIsValid("email")(), 
            this.inputIsValid("confirmEmail")(), 
            this.inputIsValid("password")(), 
            this.inputIsValid("confirmPassword")()
        ].every(isValid => isValid == true);
    }

    inputIsValid = (inputName) => () => {
        if(!this.state.validateOnChange) {
            return true;
        }

        if(this.state[inputName].length < 1) {
            return false;
        }

        switch(inputName) {
            case "confirmEmail":
                return this.state.email === this.state.confirmEmail;
            case "confirmPassword":
                return this.state.password === this.state.confirmPassword;
            default:
                return true;
        }
    }

    getErrorText = (inputName) => {
        switch(inputName) {
            case "email":
                    if(this.state[inputName].length < 1) {
                        return "Email cannot be empty";
                    } else {
                        return "";
                    }
            case "confirmEmail":
                    if(this.state[inputName].length < 1) {
                        return "Confirm Email cannot be empty";
                    } else if(this.state.email !== this.state.confirmEmail) {
                        return "Confirm Email is Different from Email"
                    } else {
                        return "";
                    }
            case "password":
                    if(this.state[inputName].length < 1) {
                        return "Password cannot be empty";
                    } else {
                        return "";
                    }
            case "confirmPassword":
                    if(this.state[inputName].length < 1) {
                        return "Confirm Password cannot be empty";
                    } else if(this.state.email !== this.state.confirmEmail) {
                        return "Confirm Password is Different from Password"
                    } else {
                        return "";
                    }
            default:
                return "";
        }
    } 

    handleRegisteration = () => {
        this.setState({
            validateOnChange: true
        }, () => {
            if(this.formIsValid()) {
                registerUser(this.state.email, this.state.password)
                    .then(success => {
                        if(!success) {
                            this.setState({
                                showErrorBanner: true
                            });
                        }
                        this.props.setAuthenticationStatus(success);
                    });
            }
        });
    }

    handleInputUpdate = (inputName) => (e) => {
        e.preventDefault();
        this.setState({
            [inputName]: e.target.value
        });
    }

    render() {

        return (
            <div className="centered-form">
                {this.state.showErrorBanner && 
                    <div>
                        <p className="error-banner-message">Registeration Failed. Please Try Again</p>
                    </div>
                }
                <TextBox 
                    label="Email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleInputUpdate("email")}
                    errorText={this.getErrorText("email")}
                    isValid={this.inputIsValid("email")}
                />
                <TextBox 
                    label="Confirm Email"
                    type="email"
                    value={this.state.confirmEmail}
                    onChange={this.handleInputUpdate("confirmEmail")}
                    errorText={this.getErrorText("confirmEmail")}
                    isValid={this.inputIsValid("confirmEmail")}
                />
                <TextBox
                    label="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputUpdate("password")}
                    errorText={this.getErrorText("password")}
                    isValid={this.inputIsValid("password")}
                />
                <TextBox
                    label="Confirm Password"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleInputUpdate("confirmPassword")}
                    errorText={this.getErrorText("confirmPassword")}
                    isValid={this.inputIsValid("confirmPassword")}
                />
                <div>
                    <Button 
                        text="Register"
                        onClick={this.handleRegisteration}
                    />
                </div>
                <div>
                    <h5>Already have an Account? <a className="app-link" href={"/auth/signin"}>Sign In</a></h5>
                </div>
            </div>
        );
    }
}

export default Register;