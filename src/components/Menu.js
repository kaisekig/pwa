import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { HashRouter, Link } from 'react-router-dom';
import '../css/Menu.css';

export class MenuItem {
    text = "";
    link = "";

    constructor(text, link) {
        this.text = text;
        this.link = link;
    }
}

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        }
    }

    render() {
        return(
            <div>
                <Navbar bg="light" variant="light" fixed="top">
                    <Container>
                        <Navbar.Brand >QR</Navbar.Brand>
                        <Nav className="mr-auto">
                        <HashRouter>
                            {
                                this.props.items.map(item =>{
                                    return(
                                        <Link to={item.link}>
                                            {item.text}
                                        </Link>
                                    );
                                })
                            }
                        </HashRouter>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
