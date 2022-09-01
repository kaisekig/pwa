import React from 'react';
import { tokenExists } from '../api/api';
import { Card, Col, Container } from 'react-bootstrap';
import Layout from '../hoc/Layout/Layout';
import '../css/Home.css';

export default class Home extends React.Component {
    componentDidMount() {
      if (tokenExists('allowed')) {
        console.log('radi');
        this.props.history.push('/quotes');
      }
    }

    render() {
        return(
            <Layout>
            <div className="home-page">
            <Container>
            <Col md={{ span: 6, offset: 3 }}>
            <Card >
                <Card.Header>
                    <h1><span role="img" aria-label="books"> 📚 </span></h1>
                </Card.Header>
                <Card.Body>
                    Welcome to the quotes app <br></br>
                    Small based forum to discover other's favourite quotes
                </Card.Body>
            </Card>
            <Card >
                <Card.Header>
                    <h1><span role="img" aria-label="collage"> 🎓 </span></h1>
                </Card.Header>
                <Card.Body>
                    Quotation is the repetition or copy of someone else's statement or thoughts.
                    Quotation marks are punctuation marks used in text to indicate a quotation.
                    Both of these words are sometimes abbreviated as "quote(s)".
                </Card.Body>
            </Card>
            <Card >
                <Card.Header>
                    <h1><span role="img" aria-label="announcement"> 📢 </span></h1>
                </Card.Header>
                <Card.Body>
                    Quotation is the repetition or copy of someone else's statement or thoughts.
                    Quotation marks are punctuation marks used in text to indicate a quotation.
                    Both of these words are sometimes abbreviated as "quote(s)".
                </Card.Body>
            </Card>
            <Card >
                <Card.Header>
                    <h1><span role="img" aria-label="announcement"> 📢 </span></h1>
                </Card.Header>
                <Card.Body>
                    Quotation is the repetition or copy of someone else's statement or thoughts.
                    Quotation marks are punctuation marks used in text to indicate a quotation.
                    Both of these words are sometimes abbreviated as "quote(s)".
                </Card.Body>
            </Card>
            </Col>
            </Container>
            </div>
            </Layout>
        );
    }
}
