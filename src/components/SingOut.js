import React from 'react';
import { Redirect } from 'react-router-dom';
import { removeToken } from '../api/api';
import Home from './Home';

export default class SignOut extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            finished: false
        };
    }

    componentDidMount() {
        this.signOut();
    }

    componentDidUpdate() {
        this.signOut();
    }
    
    render() {
        if (this.state.finished) {
            return <Redirect to={Home} />
        }

        return (
            <p>Loading...</p>
        );
    }

    setSignOut() {
        this.setState({
            finished: true
        });
    }

    signOut() {
        removeToken('allowed');
        this.setSignOut();
    }
}