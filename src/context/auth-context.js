import React from 'react';

const authContext = React.createContext({
    authenticated: false, // default values set when no value is passed in
    login: () => {}
});

export default authContext;