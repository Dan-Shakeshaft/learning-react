import React, {Component} from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        //added this for performance - stop this re-rendering at stages when it doesnt need to
        //we only need to re-render this if modal is displayed - its show value in its state is changed
        //this means order summary wont be re-rendered unecessarily
        //the wrapping component controls the re-rendering of the wrapped component i.e Modal controls re-rendering of order summary in this case
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){ 
        console.log('[Modal] will update');
    }

    render(){
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal} 
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    };
};

export default Modal;