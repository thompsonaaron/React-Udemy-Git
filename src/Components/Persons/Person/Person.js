//import './Person.css';
//import styled from 'styled-components';
import React, { Component } from 'react';
import styles from './Person.module.css';
import WithClass from '../../../hoc/WithClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    };

    // must be exactly as shown
    static contextType = AuthContext;

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        return (
            <WithClass>
                <div className={styles.Person}>
                        {this.context.authenticated ? <p>Authenticated </p> : <p>Please Log In</p>}
                    <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                    <p>{this.props.children}</p>
                    <input type="text" onChange={this.props.changed} value={this.props.name}
                        ref={this.inputElementRef} />
                </div>
            </WithClass>
        )
    }
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    onChange: PropTypes.func
};

export default Person;