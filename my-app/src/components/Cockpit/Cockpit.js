import React, { useEffect, useRef, useContext } from 'react';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
    const toggleButtonRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log(authContext.authenticated);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect');

        // setTimeout(() => {
        //     alert('Saved data to cloud');
        // }, 1000);

        toggleButtonRef.current.click();

        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []); //only executes when component rendered first time and cleanups when unmounted

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect');
        };
    });

    const classes = [];

    if (props.personsLength <= 2) {
        classes.push('red');
    }

    if (props.personsLength <= 1) {
        classes.push('bold');
    }

    return (
        <div>
            <h1>This is a React application!</h1>
            <p className={classes.join(' ')}>Rock and Roll React</p>
            <button
                ref={toggleButtonRef}
                style={props.style}
                onClick={props.clicked}>Switch Name</button>
            <button onClick={authContext.login}>Login</button>

            {/* <AuthContext.Consumer>
                {context => <button onClick={context.login}>Login</button>}
            </AuthContext.Consumer> */}
        </div>
    );
};

export default React.memo(Cockpit);