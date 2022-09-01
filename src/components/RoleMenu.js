import React from 'react';
import Menu, { MenuItem } from './Menu.js';

export default class RoleMenu extends React.Component {
   constructor(props) {
       super(props);

       this.state = {
           role: "",
       }
    }

    render() {
        let items = [];

        switch (this.props.role) {
            case "visitor" : items = this.visitorMenuItems(); break;
            case "allowed" : items = this.userMenuItems();    break;
        }

        return <Menu items={items} />
    }

    visitorMenuItems() {
        return [
            new MenuItem("Home", "/"),
            new MenuItem("Sign In", "/signin"),
        ];
    }

    userMenuItems() {
        return [
            new MenuItem("Quotes", "/quotes"),
        ];
    }
}