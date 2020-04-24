import React from 'react';
import { signIn } from '../../Services/Api/authentication'

import TextBox from '../Shared/Controls/FormTextbox';
import Button from '../Shared/Controls/FormButton';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            showErrorBanner: false,
            validateOnChange: false //proactively validate the form
        };
    }

    formIsValid = () => {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    inputIsValid = (inputName) => () => {
        if(this.state.validateOnChange) {
            return this.state[inputName].length > 0;
        } else {
            return true;
        }
    }

    handleSignIn = () => {
        if(this.formIsValid()) {
            signIn(this.state.email, this.state.password)
                .then(success => {
                    if(!success) {
                        this.setState({
                            showErrorBanner: true
                        });
                    }
                    
                    this.props.setAuthenticationStatus(success);
                });
        } else {
            this.setState({
                validateOnChange: true
            });
        }
    }

    handleInputChange = (inputName) => (e) => {
        this.setState({
            [inputName]: e.target.value
        });
    }

    render() {
        return (
            <div className="centered-form">
                {this.state.showErrorBanner && 
                    <div>
                        <p className="error-banner-message">Authentication Failed. Please Try Again</p>
                    </div>
                }
                <TextBox 
                    label="Email"
                    placeHolder="Enter Your Email"
                    type="email"
                    onChange={this.handleInputChange("email")}
                    isValid={this.inputIsValid("email")}
                    errorText="Email Cannot be Empty"
                />
                <TextBox 
                    label="Password"
                    type="password"
                    onChange={this.handleInputChange("password")}
                    isValid={this.inputIsValid("password")}
                    errorText="Password Cannot be Empty"
                />
                <div>
                    <Button 
                        text="Sign In"
                        onClick={this.handleSignIn}
                    />
                </div>

                <div>
                    <h5>Don't have an Account? <a className="app-link" href={"/auth/register"}>Register</a></h5>
                </div>
            </div>
        );
    }
}

export default SignIn;