import React from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { formatToMoney } from '../../Services/App/format';

const ItemList = (props) => {
    
  const itemDisplay = (item) => {
    return (
      <div className="view-item-block">
        <div className="view-item-labels">
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
        </div>
        <div className="view-item-details">
          <p>{item.name}</p>
          <p>{formatToMoney(item.price)}</p>
          <p>{item.quantity}</p>
        </div>
      </div>
    );
  };

  return (
    <List disablePadding={true}>
      {props.items.map((item, index) => (
        <ListItem divider={true} disableGutters={true} key={`item_${index}`}>
          {itemDisplay(item)}
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={props.deleteItem(item.name, item.altId)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default ItemList;
