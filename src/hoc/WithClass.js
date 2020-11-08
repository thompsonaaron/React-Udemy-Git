import React from 'react';

// note parenthesis (no brackets) means that this is what is returned
const withClass = props => (
        <div className={props.classes}>
            {props.children}
        </div>
);

// other way of making higher order component, as function that wraps export default withClass(App, classes.App)
// const withClass = (WrappedComponent, className) => {
//     return props => ( // returns a function
//         <div className={props.className}>
//             <WrappedComponent {...props}/>       
//         </div>
//     )
// };

export default withClass;