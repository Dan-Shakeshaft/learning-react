import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

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



//Class based approach 

class App extends Component {
  state = {
    persons: [ { name: 'Dan', age: 30 } ]
  }

  switchNameHandler = (newName) => {
    //DONT DO THIS: this.state.persons[0].name = 'Jade';
    this.setState({persons: [ { name: newName, age: 27 } ]});
  }

  nameChangedHandler = (event) => {
    this.setState({persons: [ { name: event.target.value, age: 27 } ]});
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>This is a React application!</h1>
        <p>Rock and Roll React</p>
        <button
          style={style}
          onClick={() => this.switchNameHandler('Jade')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, 'Jade!')}
          nameChange={this.nameChangedHandler}>
        </Person>
      </div>
    );
  }
}

export default App;
