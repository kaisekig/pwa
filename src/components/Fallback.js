import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../css/Fallback.css';
import { tokenExists } from '../api/api';
import Layout from '../hoc/Layout/Layout';

class Fallback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: tokenExists('allowed'),
    };
  }

  onReloadClickHandler = () => {
    if (!window.isOffline) {
      window.location.reload();
    }
  }

  render() {
    return (
      <Layout isLoggedIn={this.state.isLoggedIn}>
        <div className="fallback">
          <Card>
          <Card.Body>
            <h1>No Internet Connection</h1>
            <Button variant="primary" onClick={this.onReloadClickHandler}>Reload</Button>
          </Card.Body>
          </Card>
        </div>
      </Layout>
    );
  }
}

export default Fallback;
