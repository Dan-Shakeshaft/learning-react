import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, {StyleRoot} from 'radium';

//Class based approach 

class App extends Component {
  state = {
    persons: [ 
      { id : 1, name: 'Dan', age: 30 },
      { id: 2, name: 'Jade', age: 27 },
      { id: 3, name: 'John', age: 35 }
     ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }; 

    //const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();  NOTE: can be used instead of spread (both immutable and dont change original state array)
    const persons = [...this.state.persons]; 
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      color: 'white',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              key={person.id}
              name={person.name} 
              age={person.age}
              click={() => this.deletePersonHandler(index)} 
              nameChange={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    //let classes = ['red', 'bold'].join(' ');
    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>This is a React application!</h1>
          <p className={classes.join(' ')}>Rock and Roll React</p>
          <button
            style={style}
            onClick={() => this.togglePersonsHandler()}>Switch Name</button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);





//Function based approach - using React hooks 
// const App = props => {
//   const [ personsState, setPersonsState ] = useState({
//     persons: [ { name: 'Dan', age: 30 } ]
//   });

//   const switchNameHandler = () => {   
//     setPersonsState({persons: [ { name: 'Dan', age: 27 } ]})
//   }

//   return (
//     <div className="App">
//       <h1>This is a React application!</h1>
//       <p>Rock and Roll React</p>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person 
//         name={personsState.persons[0].name} 
//         age={personsState.persons[0].age}
//         click={switchNameHandler}>
//       </Person>
//     </div>
//   );
// }

// export default App;
