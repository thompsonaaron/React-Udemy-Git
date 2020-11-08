import React, { Component } from 'react';
import './App.css';
import Persons from '../Components/Persons/Persons';
import styles from './App.module.css';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Cockpit from '../Components/CockPit/Cockpit';
import WithClass from '../hoc/WithClass';
//import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends Component {
  state = {
    persons: [
      { id: "1", name: 'Max', age: 28 },
      { id: "2", name: 'Manu', age: 29 },
      { id: "3", name: 'Stephanie', age: 26 }
    ],
    showPersons: false,
    changeCounter: 0,
    authenticated: false
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

    // optional function format guarantees that new state is accurate b/c it saves prevState before each calculation
    // this is preferred whenever something depends on the old statenp
    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: this.state.changeCounter + 1
      }
    })
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow })
  }

  loginHandler = () => {
    this.setState({ authenticated: true })
  }

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        isAuthenticated={this.state.authenticated}
        persons={this.state.persons}
        click={this.deletePersonHandler}
        changed={this.nameChangedHandler} />
    }

    return (
      <WithClass className={styles.App}>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
          <Cockpit
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            click={this.togglePersonsHandler} />
          {persons}
        </AuthContext.Provider>
      </WithClass>
    );
  }
}

export default App;
