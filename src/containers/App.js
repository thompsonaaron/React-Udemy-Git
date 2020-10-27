import React, { Component } from 'react';
import './App.css';
import Persons from '../Components/Persons/Persons';
import styles from './App.module.css';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Cockpit from '../Components/CockPit/Cockpit';

class App extends Component {
  state = {
    persons: [
      { id: "1", name: 'Max', age: 28 },
      { id: "2", name: 'Manu', age: 29 },
      { id: "3", name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  }

// static getDerivedStateFromProps (props, state){
//   console.log('[App.js] getDerivedStateFromProps', props);
//   return state;
// }

// componentDidMount(){
//   console.log('[App.js] componentDidMount');
// }

  deletePersonHandler = (personIndex) => {
    // always create a copy first, then mutate rather than modifying the original outside of the setState function
    const persons = [...this.state.persons];
    /* const persons = this.state.persons.slice()  splice copies the original array if there are no paramaters */
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id; //changed
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

    if (this.state.showPersons) {
      persons = <Persons 
          persons = {this.state.persons}
          click={this.deletePersonHandler}
          changed={this.nameChangedHandler} />
    }

    return (
      <div className={styles.App}>
        <Cockpit 
        showPersons = {this.state.showPersons} 
        personsLength={this.state.persons.length}
        click={this.togglePersonsHandler}/>
        {persons}
      </div>
    );
  }
}

export default App;
