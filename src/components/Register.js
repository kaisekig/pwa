import React from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import api from '../api/api';
import Layout from '../hoc/Layout/Layout';
import '../css/Register.css';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            
            isLoggedIn: false
        }
    }

    formInputChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        });

        this.setState(newState);
    }

    setRegisterState(isLoggedIn) {
        const newRegisterState = Object.assign(this.state, {
            isLoggedIn: isLoggedIn,
        });

        this.setState(newRegisterState);
    }

    doRegister() {
        api("auth/register", "post", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        })
        .then((res) => {
            console.log(res);

            if (res.status === "error") {
                console.log(res.data);
                return;
            }

            if (res.status === "ok") {
                this.setRegisterState(true);
            }
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
            <Redirect to="/signin" />
            );
        }

        return (
            <Layout isLoggedIn={this.state.isLoggedIn}>
                <div className="signin-page">
                <br />
                <Col md={{span: 6, offset: 3}}>
                    <Card.Body>
                        <Card.Title>
                        <p>Register</p>
                        <span role="img" aria-label="pointing_down"> 👇 </span>
                        </Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Group as={Col}>
                                    <Form.Label htmlFor="username"> Username: </Form.Label>
                                    <Form.Control type="text" id="username"
                                                  value={this.state.username}
                                                  onChange={event => this.formInputChange(event)} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label htmlFor="email"> Email: </Form.Label>
                                    <Form.Control type="email" id="email"
                                                  value={this.state.email}
                                                  onChange={event => this.formInputChange(event)} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label htmlFor="password"> Password: </Form.Label>
                                    <Form.Control type="password" id="password"
                                                  value={this.state.password}
                                                  onChange={event => this.formInputChange(event)} />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="dark" size="sm"
                                            onClick= { () => this.doRegister() }> Register</Button>
                                </Form.Group>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Col>
                </div>
            </Layout>
        );
    }
}