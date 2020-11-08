import React, { useEffect, useRef, useContext } from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const Cockpit = props => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect( () => {
        console.log('[Cockpit.js] useEffect');
        toggleBtnRef.current.click();
        console.log("is authenticated is " + authContext.authenticated);
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        }
    }, []); // passing argument as an empty array (instead of props.persons) means this only runs once when rendered and once when unmounted
    // this array tells useEffect when to run and if this data is updated, run useEffect

    const assignedClasses = []; // dynamically add styles
    let btnClass = '';

    if (props.showPersons){
        btnClass = classes.Red;
    }
    if (props.personsLength <= 2) {
        assignedClasses.push(classes.red);
    }
    if (props.personsLength <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a React App</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button ref={toggleBtnRef} className={btnClass} onClick={props.click}>Toggle Person</button>
                {<button onClick={authContext.login}>Log In</button>}
        </div>
    );
}

export default React.memo(Cockpit);