import React, { Component } from 'react';

// wraps components during return statement that may throw an error (like ajax call)
// does not show in development mode
class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true,
            errorMessage: error
        })
    }
    
    render(){
        if (this.state.hasError){
            return <h1>{this.state.errorMessage}</h1>
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;