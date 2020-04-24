import React from 'react'
import QueryString from 'query-string';

import ProductForm from '../ProductModules/ProductForm';
import ProductList from '../ProductModules/ProductList';

import SharedPageContent from '../Shared/Wrappers/SharedPageContent';
import TextBox from '../Shared/Controls/FormTextbox';
import Select from "../Shared/Controls/FormSelect";
import Button from '../Shared/Controls/FormButton';

import { createMerchant, updateMerchant, getMerchant } from '../../Services/Api/merchant';
import { getRecipients } from '../../Services/Api/recipients';

class MerchantForm extends React.Component {

    constructor(props) {
        super(props);

        //manage state options - 0: view, 2: edit
        const merchantAltId = QueryString.parse(props.location.search).id;
        this.state = {
            altId: merchantAltId || "",
            title: merchantAltId ? "Edit Merchant" : "Create Merchant",
            name: "",
            description: "",
            city: "",
            merchantState: "",
            paymentRecipient: "",
            phone: "",
            products: [],
            recipients: [],
            validateOnChange: false,
            showProductForm: false
        }
    }

    componentDidMount() {

        const merchantId = this.state.altId;
        if(merchantId) {
            getMerchant(merchantId).then(merchant => {

                this.setState({
                    name: merchant.name,
                    description: merchant.description,
                    city: merchant.city,
                    merchantState: merchant.state,
                    paymentRecipient: merchant.paymentRecipientId,
                    phone: merchant.phone,
                    products: merchant.products,
                })
            });
        }

        getRecipients().then(recipients => {
            if (recipients && recipients.length > 0) {
              this.setState({
                recipients: recipients
              });
            }
        });
    }

    mapRecipientOptions = () =>
        (this.state.recipients || []).map((r) => ({
        display: r.name,
        value: r.altId,
    }));

    handleInputChange = (inputName) => (e) => {
        this.setState({
            [inputName]: e.target.value
        });     
    }

    toggleProductForm = (value) => {

        this.setState({
            showProductForm: value
        });
    }

    addProduct = (product) => {

        //validate to ensure no two products have the same name
        let products = this.state.products;
        if(!products) {
            products = [];
        }

        products.push(product);

        this.setState({
            products: products,
            showProductForm: false
        });
    }

    inputIsValid = (inputName) => () => {
        if (this.state.validateOnChange) {
            return this.state[inputName].length > 0;
        } else {
            return true;
        }
    };

    formIsValid = () => {
        const {
            name,
            description,
            city,
            merchantState,
            paymentRecipient,
            phone,
            products,
        } = this.state;
        return (
          name.length > 0 &&
          description.length > 0 &&
          city.length > 0 &&
          paymentRecipient.length > 0 &&
          merchantState.length > 0 &&
          phone.length > 0 &&
          products.length > 0
        );
      };

    saveMerchant = () => {
        const formIsValid = this.formIsValid();
        if(!formIsValid) {
            this.setState({
                validateOnChange: true
            });

            return;
        } 
        //save store to api and switch to manage store
        const saveFunc = this.state.altId ? updateMerchant : createMerchant ;
        saveFunc({
            altId: this.state.altId,
            name: this.state.name,
            description: this.state.description,
            city: this.state.city,
            state: this.state.merchantState,
            phone: this.state.phone,
            paymentRecipientId: this.state.paymentRecipient,
            products: this.state.products.filter(p => !p.altId) //save only unsaved products
        })
        .then((merchant) => {
            if(merchant != null) {
                //switch to view merchant page
                location.assign(`/merchant/manage?id=${merchant.altId}`);
            }
        });
    }

    render() {

        return <SharedPageContent>
            <h1>{this.state.title}</h1>
            <div>
                {this.state.validateOnChange && this.state.paymentRecipient.length < 1 && (
                    <p
                    style={{
                        color: "#e20000",
                        fontWeight: 600,
                    }}
                    >
                    Store Must Have a Payment Recipient to be Saved
                    </p>
                )}
                {this.state.validateOnChange && this.state.products.length < 1 && (
                    <p className="validation-error-text bold-message">
                        Store Must Have at Least One Product
                    </p>
                )}
                <TextBox 
                    label="Store Name"
                    value={this.state.name}
                    placeholder="Enter The Store Name"
                    errorText="Store Name Cannot Be Empty"
                    onChange={this.handleInputChange("name")}
                    isValid={this.inputIsValid("name")}
                />
                <TextBox 
                    label="Store Description"
                    value={this.state.description}
                    placeholder="Describe Your Store To Customers"
                    errorText="Store Must Have A Description"
                    onChange={this.handleInputChange("description")}
                    isValid={this.inputIsValid("description")}
                />
                <TextBox 
                    label="Contact Number"
                    value={this.state.phone}
                    placeholder="Enter Your Store's Mobile Phone Number"
                    errorText="Contact Number Is Required"
                    onChange={this.handleInputChange("phone")}
                    isValid={this.inputIsValid("phone")}
                />
                <h5>Store Address</h5>
                <TextBox
                    label="City"
                    value={this.state.city}
                    placeholder="City Store Is Located In"
                    errorText="City is Required"
                    onChange={this.handleInputChange("city")}
                    isValid={this.inputIsValid("city")}
                />
                <TextBox
                    label="State"
                    value={this.merchantState}
                    placeholder="State The Merchant Is Located In"
                    errorText="State is Required"
                    onChange={this.handleInputChange("merchantState")}
                    isValid={this.inputIsValid("merchantState")}
                />
                <Select
                    label="Payment Recipient"
                    options={this.mapRecipientOptions()}
                    value={this.state.paymentRecipient}
                    onChange={this.handleInputChange("paymentRecipient")}
                />
            </div>
            <div>
                {/* Manage Products Section */}
                {this.state.showProductForm ?
                    <ProductForm 
                        saveProduct={this.addProduct} 
                        cancelAddProduct={() => this.toggleProductForm(false)}
                    />
                    :
                    <div>
                        <Button 
                            text={this.state.altId ? "Update Store" : "Create Store"}
                            type="secondary"
                            onClick={this.saveMerchant}
                        />
                        <Button 
                            text="New Product"
                            onClick={() => this.toggleProductForm(true)}
                        />
                    </div>
                }

                <ProductList products={this.state.products} />
            </div>
        </SharedPageContent>;
    }
}

export default MerchantForm;