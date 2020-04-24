import React from 'react'

import TextBox from '../Shared/Controls/FormTextbox';
import Select from '../Shared/Controls/FormSelect';
import Button from '../Shared/Controls/FormButton';

class ItemForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            itemPrice: 0.0,
            itemQuantity: 0,
            productAltId: "", 
            validateOnChange: false
        };
    }

    handleInputChange = (inputName) => (e) => {
        this.setState({
            [inputName]: e.target.value
        });     
    }

    handleSelectChange = (e) => {
        const productAltId = e.target.value;
        if(productAltId) {
            const selectedProduct = this.props.products.find(p => p.altId == productAltId);
            if(selectedProduct) {
                this.setState({
                    productAltId: selectedProduct.altId,
                    itemName: selectedProduct.name,
                    itemPrice: selectedProduct.price
                });
            } 
        }
    }

    handleAddItemToOrder = (e) => {
        const formIsValid = this.formIsValid();
        if(formIsValid) {
            //trigger a callback on order
            this.props.addToOrder({
                name: this.state.itemName,
                price: this.state.itemPrice,
                quantity: this.state.itemQuantity,
                productAltId: this.state.productAltId
            });
        } else {
            this.setState({
                validateOnChange: true
            });
        }
    }

    inputIsValid = (inputName) => () => {
        if(this.state.validateOnChange) {
            return inputName == "itemName" ? this.state[inputName].length > 0 :
                this.state[inputName] > 0;
        } else {
            return true;
        }
    }

    formIsValid = () => {
        return this.state.itemName.length > 0 && this.state.itemPrice > 0 && this.state.itemQuantity > 0;
    }

    itemTextForm = () => {

        return <div>
            <TextBox
                label="Item Name"
                type="text"
                errorText="Item Name is Required"
                placeholder="Enter The Name of the Item You Want"
                className={"subform-input-text"}
                onChange={this.handleInputChange("itemName")}
                isValid={this.inputIsValid("itemName")}
            />
            <TextBox
                label="Item Price"
                type="number"
                errorText="Item Price is Required"
                placeholder="Enter The Price of the Item"
                className={"subform-input-text"}
                onChange={this.handleInputChange("itemPrice")}
                isValid={this.inputIsValid("itemPrice")}
            />
        </div>
    }

    productSelectionForm = () => {

        const productSelection = this.props.products.map(p => ({
            //Display only product name if this is the currently selected product else display with price
            //(Product Name - Price)
            display: p.altId != this.state.productAltId ? `${p.name} - ${p.price}` : `${p.name}`,
            value: p.altId
        }));

        return <div>
            <Select 
                label="Select Product"
                options={productSelection}
                onChange={this.handleSelectChange}
                value={this.state.productAltId}
            />
            {this.state.productAltId &&
                <div>
                    <label>Price:</label>
                    <p>{this.state.itemPrice}</p>
                </div>
            }
        </div>
    }

    render() {
        return (
            <div className={"subform"}>
                <div className="subform-input-area">
                    {this.props.products.length > 0 ? this.productSelectionForm() : this.itemTextForm()}
                    <TextBox
                        label="Number of Items"
                        type="number"
                        errorText="Item Quantity is Required"
                        placeholder="How many Items do you want"
                        className={"subform-input-text"}
                        onChange={this.handleInputChange("itemQuantity")}
                        isValid={this.inputIsValid("itemQuantity")}
                    />
                </div>
                <div className={"subform-action-area"}>
                    <Button 
                        text="Add To Order"
                        onClick={this.handleAddItemToOrder}
                    />
                    <Button
                        text="Cancel"
                        type="cancel"
                        onClick={this.props.cancelAddItem}
                    />
                </div>
            </div>
        );
    }
}

export default ItemForm;