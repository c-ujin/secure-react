import React from "react";
import QueryString from 'query-string';

import ProductList from '../ProductModules/ProductList';

import SharedPageContent from '../Shared/Wrappers/SharedPageContent';
import Button from '../Shared/Controls/FormButton';

import { getMerchant } from '../../Services/Api/merchant';

class ManageMerchant extends React.Component {

  constructor(props) {
    super(props);

    const merchantAltId = QueryString.parse(props.location.search).id;
    this.state = {
      altId: merchantAltId || "",
      name: "",
      description: "",
      city: "",
      merchantState: "",
      paymentRecipient: "",
      products: [],
    };
  }

  componentDidMount() {
    const merchantAltId = this.state.altId;

    if(merchantAltId) {
      getMerchant(merchantAltId).then(merchant => {
        this.setState({
          name: merchant.name,
          description: merchant.description,
          city: merchant.city,
          merchantState: merchant.state,
          paymentRecipient: merchant.paymentRecipient,
          products: merchant.products
        });
      });
    }
  }

  edit = () => {


  }

  render() {
    return (
      <SharedPageContent>
        <div>
          <p>{this.state.name}</p>
          <p>
            {this.state.city}, {this.state.merchantState}
          </p>
          <button onClick={() => {
            location.assign(`/merchant/create?id=${this.state.altId}`);
          }}>
            Edit
          </button>
        </div>
        <div>
            <p>Payment Recipient: {this.state.paymentRecipient}</p>
        </div>
        <ProductList products={this.state.products} />
      </SharedPageContent>
    );
  }
}

export default ManageMerchant;
