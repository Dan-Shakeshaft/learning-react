import React, {Component, Fragment} from 'react';
import './Person.css';
import Radium from 'radium';
import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';

class Person extends Component {
    render () {
        console.log('[Person.js] rendering');

        const style = {
            '@media (min-width: 500px)': {
                width: '450px'
            }
        };
    
        return (
            // <div className="Person" style={style}>
            //     <p>I'm {this.props.name} and I am {this.props.age} years old</p>
            //     <p>{this.props.children}</p>
            //     <input type="text" onChange={this.props.nameChange} value={this.props.name}/>
            //     <button onClick={this.props.click}>Delete</button>
            // </div>

            // <Fragment>
            //     <p>I'm {this.props.name} and I am {this.props.age} years old</p>
            //     <p>{this.props.children}</p>
            //     <input type="text" onChange={this.props.nameChange} value={this.props.name}/>
            //     <button onClick={this.props.click}>Delete</button>
            // </Fragment>

            <Auxiliary>
                <p>I'm {this.props.name} and I am {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.nameChange} value={this.props.name}/>
                <button onClick={this.props.click}>Delete</button>
            </Auxiliary>

            //render adajacent JSX
            // [
            //     <p key={1}>I'm {this.props.name} and I am {this.props.age} years old</p>,
            //     <p key={2}>{this.props.children}</p>,
            //     <input key={3} type="text" onChange={this.props.nameChange} value={this.props.name}/>,
            //     <button key={4} onClick={this.props.click}>Delete</button>
            // ]
        );
    }
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    change: PropTypes.func
};

export default Radium(withClass(Person, "Person"));