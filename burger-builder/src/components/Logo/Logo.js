import React from 'react';
import burgerLogo from '../../assets/images/original.png';
import classes from '../Logo/Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{
        height: props.height,
        margin: props.margin,
    }}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default logo;