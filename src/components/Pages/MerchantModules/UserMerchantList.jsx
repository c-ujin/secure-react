import React from 'react';
import QueryString from 'query-string';

import Pager from '../Shared/Controls/Pager';
import { getUserMerchantList, getUserMerchantCount } from '../../Services/Api/merchant';
import SharedPageContent from '../Shared/Wrappers/SharedPageContent';
import LoadingScreen from '../Shared/Wrappers/LoadingScreen';


class UserMerchantList extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            merchants: [],
            recordCount: 0,
            page: QueryString.parse(props.location.search).page || 1,
            maxRecords: 5,
            loadingData: true
        };
    }

    componentDidMount() {

        this.pageData(this.state.page);
    }

    pageData = (page) => {

        if(this.state.recordCount < 1) {
            getUserMerchantCount().then(count => {
                this.setState({
                    recordCount: count,
                    loadingData: false
                })
            });
        }

        getUserMerchantList(page, this.state.maxRecords).then(list => {
            this.setState({
                merchants: list || [],
                page: page
            });

            //update URL
            let currentUrlParams = new URLSearchParams(window.location.search);
            currentUrlParams.set('page', page);
            this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());

            window.scrollTo(0, 0);
        });
    }

    handleDeleteMerchant = (altId) => (e) => {
        e.preventDefault();
        
        // deleteOrder(altId).then(success => {
        //     if(success) {
        //         location.reload();
        //     }
        // });
    }

    render() {
        return (
        <SharedPageContent>
            {this.state.loadingData &&
                <LoadingScreen />
            }

            {
                this.state.merchants.length < 1 ? 
                    (<div>
                        {(!this.state.loadingData && this.state.recordCount < 1) &&
                            <h4>
                                You have No Store. <a href={"/merchant/create"}>Create a Store</a>
                            </h4>
                        }
                        </div>) : 
                    this.state.merchants.map(merchant => {
                        return (
                            <div className="list-plan-item" key={merchant.altId} >
                                <div>
                                    <p className="list-plan-name">{merchant.name}</p>
                                    <p className="list-plan-text">{merchant.city}</p>

                                </div>
                                <div style={{ marginTop: "10px"}}>
                                    <a className="list-plan-action-link" href={`/merchant/manage?id=${merchant.altId}`}>View</a>
                                    <a className="list-plan-action-link" href={``} onClick={this.handleDeleteMerchant(merchant.altId)}>Delete</a>
                                </div>
                            </div>
                        )
                    })

            }
            <Pager 
                recordCount={this.state.recordCount}
                maxRecords={this.state.maxRecords}
                pageData={this.pageData}
                currentPage={this.state.page}
            />
        </SharedPageContent>
        )
    }
}

export default UserMerchantList;