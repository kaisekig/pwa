import React from 'react';
import '../css/Quotes.css';
import { Col, Card, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api/api';
import Layout from '../hoc/Layout/Layout';

const emptyCards = [];
for (let i = 0; i < 5; i++) {
  emptyCards.push((
    <div>
      <Card key={i}>
        <Card.Body>
          <Card.Title>
            <p></p>
          </Card.Title>
          <Card.Text>
            <br />
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Text>
            <br />
          </Card.Text>
        </Card.Footer>
      </Card>
      <br />
      <br />
    </div>
  ));
}

export default class Quotes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            newQuote: {
                author: "",
                body: "",
            },

            isLoggedIn: true,
            quotes: [],
            quotesComment: new Map()
        }

        this.setNewQuote = this.setNewQuote.bind(this);
        this.postQuote = this.postQuote.bind(this);
    }

    componentDidMount() {
        this.getAllQuotes();

        const bc = new BroadcastChannel('sync-channel');
        bc.onmessage = (message) => {
            if (message.data.finished) {
                this.getAllQuotes();
            }
        }
    }

    postQuote(event) {
        event.preventDefault();

        api("api/post/create", "post", {...this.state.newQuote}).then((response) => {
          console.log(response);
            if (response.status === "ok") {
                this.getAllQuotes();
                //this.setState({
                //  quotes: [ ...this.state.quotes, response.data ],
                //});
            }
        }).catch((err) => console.log(err));
    }

    getAllQuotes = () => {
        api("api/post", "get", { } )
        .then((res) => {
            console.log('response', res);
            if (res.status === "error") {
                //this.setLogginState(false);
                return;
            }

            if (res.status === "login") {
                this.setLogginState(false);
            }

            if (!Array.isArray(res.data)) {
                this.setQuotesState([]);
                return;
            }

            const quotes = res.data;
            this.setQuotesState(quotes);
        }).catch((err) => console.log(err));
    }
    
     postQuoteComment(quoteId, event) {
        event.preventDefault();
        if (this.state.quotesComment.has(quoteId)) {
            api(`api/post/${quoteId}/comment`, "post", { text: this.state.quotesComment.get(quoteId) })
            .then((res)=> {
                api("api/post/" + quoteId, "get", {}).then((res) => console.log(res)).catch((err) => console.log(err));
                /*
                this.setState(prevState => {
                    return {
                        ...prevState,
                        quotesComment: prevState.quotesComment.set(quoteId, "")
                    }
                })
                */
                console.log("returned comment from api", res);
            }).catch((err) => console.log(err));
        }
    }
    

    setLogginState(isLoggedIn) {
        const newLogginState = Object.assign(this.state, {
            isLoggedIn: isLoggedIn,
        });

        this.setState(newLogginState);
    }

    setQuotesState = (quotes) => {
        this.setState(Object.assign(this.state, {
            quotes: quotes,
        }));
    }

    setNewQuote(event) {
        this.setState((prevState) => {
            return {
                ...prevState,
                newQuote: {
                    ...prevState.newQuote,
                    [event.target.id]: event.target.value
                }
            }
        });
    }

    setQuoteComment(quoteId, event) {
        this.setState(prevState => {
            return {
                ...prevState,
                quotesComment: prevState.quotesComment.set(quoteId, event.target.value)
            }
        })
    }

    getIniitalComment(quoteId) {
        return this.state.quotesComment.has(quoteId) ? this.state.quotesComment.get(quoteId): "";
    } 


    render() {
        if (this.state.isLoggedIn === false) {
            return(
                <Container>
                    <br />
                        <Card.Text>
                            <h3>You are not signed in!</h3>
                            <p>Please, go back and <span>👉 </span><Link to='/signin'>sign in</Link></p>
                        </Card.Text>
                </Container>
            );
        }

        let quotes = emptyCards;

        if (this.state.quotes.length) {
          quotes = this.state.quotes.map((quote, index) => {
            return (
                // --- div
                <div key={quote.postId}>    
                <Card>
                    <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                            {quote.body}
                        {' '}
                    </p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">{quote.author}</cite>
                    </footer>
                    </blockquote>
                    </Card.Body>
                    <Card.Footer>
                        <Card.Text>
                            <Form onSubmit={(event) => this.postQuoteComment(quote.postId, event)}>
                                <Form.Row className="align-items-center">
                                    <Col Col xs={7}>
                                        <Form.Label htmlFor="inlineFormInput" srOnly>
                                            Comment
                                        </Form.Label>
                                        <Form.Control
                                            className="mb-2"
                                            id="inlineFormInput"
                                            placeholder="Comment..."
                                            value={this.getIniitalComment(quote.postId)}
                                            onChange={(event) => this.setQuoteComment(quote.postId, event)}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button type="submit" variant="dark" className="mb-2" size="sm">
                                            Post
                                        </Button>
                                        <Link to={"/" + quote.postId} >
                                            <div className="link-params">
                                                Open
                                            </div>
                                        </Link>
                                    </Col>
                                </Form.Row>
                            </Form>
                        </Card.Text>
                    </Card.Footer>
                </Card>
                <br />
                <br />
                </div>
                
            );
          });
        }

        return(
            <Layout isLoggedIn={this.state.isLoggedIn}>
                <div className="quotes-input">
                <Col md={{ span: 6, offset: 3 }}>
                <Card.Body>
                        <Card.Title>
                            <p>Quotes goes here</p>
                            <span role="img" aria-label="pointing_down"> 👇 </span>
                        </Card.Title>
                        <Card.Text>
                            <Form onSubmit={this.postQuote}>
                                <Form.Group controlId="author">
                                    <Form.Label> Author: </Form.Label>
                                    <Form.Control type="text" value={this.state.newQuote.author} onChange={this.setNewQuote} />
                                </Form.Group>
                                <Form.Group controlId="body">
                                    <Form.Label>Quote:</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={this.state.newQuote.body} onChange={this.setNewQuote}/>
                                </Form.Group>
                                <Form.Group>
                                    <Button type="submit" variant="dark" size="sm">Post</Button>
                                </Form.Group>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Col>
                <Container>
                {quotes}
                </Container>
                </div>
          </Layout>
        );
    }
}

/*

    <Card.Title>
        <p>Author: {quote.author}</p>
    </Card.Title>
    <Link to={"/" + quote.postId} >
    <Card.Text>
        Quote: {quote.body}
    </Card.Text>
    </Link>


    <div className="quotes">
*/ 

/*  `quote_${index}`  */
