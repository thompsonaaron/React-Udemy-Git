import React, { PureComponent } from 'react';
import Person from './Person/Person';

// pure components implement shouldComponentUpdate with all props (click, name, etc.) compared to next props
class Persons extends PureComponent {

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     if (nextProps.persons !== this.props.persons){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }
    render() {
        return this.props.persons.map((person, index) => { /* iterates on objects in an array*/
            return (
                <Person
                    click={() => this.props.click(index)}
                    name={person.name}
                    age={person.age}
                    key={person.id} // keys are required to help improve efficiency when React compares virtual DOM to real DOM
                    changed={event => this.props.changed(event, person.id)} />
            );
        });
    }
}

export default Persons;