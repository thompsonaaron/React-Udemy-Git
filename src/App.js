import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import styles from './App.module.css';

class App extends Component {
  state = {
    persons: [
      { id: "1", name: 'Max', age: 28 },
      { id: "2", name: 'Manu', age: 29 },
      { id: "3", name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    // always create a copy first, then mutate rather than modifying the original outside of the setState function
    const persons = [...this.state.persons];
    /* const persons = this.state.persons.slice()  splice copies the original array if there are no paramaters */
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.userId === id; //changed
    });

    const person = { // creates a copy
      ...this.state.persons[personIndex] // spread operator copies properties into this new object. Alt is Object.assign({}, this.state.persons[personIndex])
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    })
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => { /* iterates on objects in an array*/
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id} // keys are required to help improve efficiency when React compares virtual DOM to real DOM
              changed={event => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      btnClass = styles.Red;
    }


    let classes = []; // dynamically add styles
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }


    return (
      <div className={styles.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button
        className = {btnClass}
          onClick={() => this.togglePersonsHandler()}>Toggle Person
        </button>
        {persons}
      </div>
    );
  }
}

export default App;
