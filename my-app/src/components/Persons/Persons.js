import React, {PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps ' + props);
    //     return state;
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate');

    //     if (nextProps.persons !== this.props.persons || 
    //         nextProps.changed !== this.props.changed || 
    //         nextProps.clicked !== this.props.clicked) {
    //         return true;
    //     } else {
    //         return false;
    //     }

    //     return true;
    // }

    getSnapshotBeforeUpdate(prevProps, prevUpdate) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Test'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render () {
        console.log('[Persons.js] ')

        return this.props.persons.map((person, index) => {
            return (<Person 
            key={person.id}
            name={person.name} 
            age={person.age}
            click={() => this.props.clicked(index)} 
            isAuth={this.props.isAuthenticated}
            nameChange={(event) => this.props.changed(event, person.id)} />);
        });
    }
};

export default Persons;