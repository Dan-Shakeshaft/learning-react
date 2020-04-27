import React, {Component} from 'react';
import './Person.css';
import Radium from 'radium';
import Auxiliary from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        //this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render () {
        console.log('[Person.js] rendering');

        // const style = {
        //     '@media (min-width: 500px)': {
        //         width: '450px'
        //     }
        // };
    
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
                {/* <AuthContext.Consumer>
                    {context => context.authenticated ? <p>User authenticated</p> : <p>Please login</p>}
                </AuthContext.Consumer> */}
                {this.context.authenticated ? <p>User authenticated</p> : <p>Please login</p> }

                <p>I'm {this.props.name} and I am {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input type="text" 
                //ref={(inputEl) => {this.inputElement = inputEl}} 
                ref={this.inputElementRef}
                onChange={this.props.nameChange} 
                value={this.props.name}/>
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