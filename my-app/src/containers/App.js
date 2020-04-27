import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Radium, {StyleRoot} from 'radium';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';

//Class based approach 

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    // this.state = {
    //   persons: [ 
    //     { id : 1, name: 'Dan', age: 30 },
    //     { id: 2, name: 'Jade', age: 27 },
    //     { id: 3, name: 'John', age: 35 }
    //    ],
    //   showPersons: false
    // }
  }

  state = {
    persons: [ 
      { id : 1, name: 'Dan', age: 30 },
      { id: 2, name: 'Jade', age: 27 },
      { id: 3, name: 'John', age: 35 }
     ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps ' + props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
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
    
    this.setState((prevState, props) => {
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

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
    console.log('[App.js] render');

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
      persons = 
          <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}/>;
    
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    return (
      <StyleRoot>
        <Auxiliary>
          <button onClick={() => { this.setState({showCockpit: false})}}>Remove cockpit</button>
          {this.state.showCockpit ? <Cockpit 
            personsLength={this.state.persons.length} 
            style={style} 
            clicked={this.togglePersonsHandler}/>: null }
          {persons} 
        </Auxiliary>
      </StyleRoot>
    );
  }
}

export default Radium(withClass(App, "App"));





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
