import React, { useState, useEffect } from 'react';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js'
import 'popper.js';
import { Alert } from 'react-bootstrap';

import RoleMenu from '../../components/RoleMenu';

const createHeader = (isLoggedIn, showBackButton) => {
  return (
    <RoleMenu role={isLoggedIn ? 'allowed' : 'visitor'} showBackButton={showBackButton} />
  );
}

const alertStyle = {
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  zIndex: 9999,
  margin: 0,
  textAlign: 'center'
}

const Layout = (props) => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const goOnline = () => {
      window.isOffline = false;
      setIsOffline(false);
    }

    const goOffline = () => {
      window.isOffline = true;
      setIsOffline(true);
    }

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    }
  });

  useEffect(() => {
    if (window.isOffline) {
      setIsOffline(true);
    }
  }, []);

  const header = createHeader(props.isLoggedIn, props.showBackButton);

  return (
    <div>
      {header}
      { isOffline ? <Alert variant="warning" style={alertStyle}>Offline mode</Alert> : null }
      <br />
      {props.children}
    </div>
  );
}

export default Layout;
