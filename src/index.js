import ReactDOM from 'react-dom';
import React, {Suspense} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './index.css';
//import SignIn from './components/SignIn.js';
//import Fallback from './components/Fallback';
//import Quotes from './components/Quotes.js';
//import SingleQuote from './components/SingleQuote';
//import Home from './components/Home.js';
import Shell from './components/Shell.js';

const Home = React.lazy(() => import('./components/Home'));
const SignIn = React.lazy(() => import('./components/SignIn'));
const Fallback = React.lazy(() => import('./components/Fallback'));
const Quotes = React.lazy(() => import('./components/Quotes'));
const SingleQuote = React.lazy(() => import('./components/SingleQuote'));
const SignOut = React.lazy(() => import('./components/SingOut'));
const Register = React.lazy(() => import('./components/Register'));

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
    <Suspense fallback={<Route path="/" component={Shell} />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/register" component={Register} />
        <Route path="/signout" component={SignOut} />
        <Route path="/fallback" component={Fallback} />
        <Route path="/quotes" component={Quotes} />
        <Route path="/:postId" component={SingleQuote} />
      </Switch>
    </Suspense>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

