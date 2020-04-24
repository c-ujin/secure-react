import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="sidebar-container">
                <div className={"sidebar"}>
                    <List component="nav" style={{ position: "fixed" }}>
                        <ListItemLink href="/shop">
                            <p>Shop</p>
                        </ListItemLink>
                        <ListItemLink href="/order/create">
                            <p>Create Order</p>
                        </ListItemLink>
                        <ListItemLink href="/order/list">
                            <p>View Orders</p>
                        </ListItemLink>
                        <ListItemLink href="/wallet/manage">
                            <p>Manage Wallet</p>
                        </ListItemLink>
                        <ListItemLink href="/recipient/manage">
                            <p>Manage Recipients</p>
                        </ListItemLink>
                        <ListItemLink href="/wallet/history">
                            <p>Wallet History</p>
                        </ListItemLink>
                        <ListItemLink href="">
                            <p>Expense Report</p>
                        </ListItemLink>
                        <ListItemLink href="/merchant/create">
                            <p>Create Merchant</p>
                        </ListItemLink>
                        <ListItemLink href="/merchant/list">
                            <p>My Store</p>
                        </ListItemLink>
                    </List>
                </div>
            </div>
        );
    }
}

const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
}

export default Sidebar;