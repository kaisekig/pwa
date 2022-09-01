import React from 'react';
import { Card, Form, Button, Col} from 'react-bootstrap';
import { Redirect } from 'react-router';
import api, { saveToken } from '../api/api.js';
import Layout from '../hoc/Layout/Layout';
import '../css/SignIn.css';

export default class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isLoggedIn: false,
        }
    }
    
    formInputChange(event) {
        const newState = Object.assign(this.state, {
            [event.target.id]: event.target.value
        });

        this.setState(newState);
    }

    setLoginState(isLoggedIn) {
        const newLoginState = Object.assign(this.state, {
            isLoggedIn: isLoggedIn,
        });

        this.setState(newLoginState);
    }

    doLogin() {
        api("auth/signin", "post", {
            username: this.state.username,
            password: this.state.password,
        })
        .then((res) => {
            if (res.status === "error") {
                console.log(res.data);
                return;
            }

            if (res.status === "ok") {
                saveToken("allowed", res.data.token);

                this.setLoginState(true);
            }
        })
    }

    render() {
        if (this.state.isLoggedIn === true) {
            return(
                <Redirect to="/quotes" />
            );
        }
        return(
            <Layout isLoggedIn={this.state.isLoggedIn}>
                <div className="signin-page">
                <br />
                <Col md={{span: 6, offset: 3}}>
                    <Card.Body>
                        <Card.Title>
                        <p>Sign in here!</p>
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
                                    <Form.Label htmlFor="password"> Password: </Form.Label>
                                    <Form.Control type="password" id="password"
                                                  value={this.state.password}
                                                  onChange={event => this.formInputChange(event)} />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="dark" size="sm"
                                            onClick= { () => this.doLogin() }> Jump in</Button>
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
