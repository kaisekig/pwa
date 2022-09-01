import React, { Component } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import api from "../api/api";
import Layout from "../hoc/Layout/Layout";
import Fallback from "./Fallback";

export default class SingleQuote extends React.Component {
   constructor(props) {
       super(props);

       this.state = {
           quote: {
              comments: []
           },
           isLoggedIn: true,
           isOffline: false,
        }
    }

    loadQuote() {
        let id = this.props.match.params.postId;

        api("api/post/" + id, "get", {})
        .then((res) => {
            console.log(res);
            //if (res.status === "error" || res.status === "login") {
            if (res.status === 'error') {
              //this.props.history.replace('/fallback');
              this.setState({
                isOffline: true,
              });
              return;
            }
            if (res.status === "login") {
                this.setLogginState(false);
            }

            const quote = res.data;
            if (quote) {
                this.setQuoteState(quote);
            }

            this.setState({
              isOffline: false,
            });
            console.log("QUOTE", quote);
        }).catch((err) => console.log(err));
    }
    
    componentDidMount() {
        this.loadQuote();

        const bc = new BroadcastChannel('sync-channel');
        bc.onmessage = (message) => {
            console.log(message);
            if (message.data.finished) {
                this.loadQuote();
            }
        }
    }

    render() {
        if (this.state.isLoggedIn === false) {
            return <Redirect to="/signin" />;
        }
        if (this.state.isOffline) {
          return <Fallback />;
        }

        let card = (
            <Card>
                <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                            {this.state.quote.body}
                        {' '}
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">{this.state.quote.author}</cite>
                    </footer>
                </blockquote>
                </Card.Body>
                <Card.Footer>
                    {this.state.quote.comments.length === 0 && <br />}
                    {this.state.quote.comments.map((comment) => {
                        return(
                            <div>
                                <Card.Text key={comment.id}>
                                    <Row>
                                        <p>Comment {comment.text}</p>
                                    </Row>
                                </Card.Text>
                            </div>
                        )
                    })}
                </Card.Footer>
            </Card>
          );

        return(
            <Layout isLoggedIn={this.state.isLoggedIn} showBackButton>
                <Container>
                    <br />
                    <br />
                    {card}
                </Container>
            </Layout>
        );
    }

    setLogginState(isLoggedIn) {
        const newLogginState = Object.assign(this.state, {
            isLoggedIn: isLoggedIn,
        });

        this.setState(newLogginState);
    }

    setQuoteState(quote) {
        this.setState(Object.assign(this.state, {
            quote: quote,
        }));
    }

    setCommentsState(comments) {
        this.setState(Object.assign(this.state, {
            comments: comments,
        }));
    }
}


/*


    <Card.Title>
        <p>{this.state.quote.author}</p>
    </Card.Title>
    <Card.Text>
        <p>{this.state.quote.body}</p>
    </Card.Text>





*/