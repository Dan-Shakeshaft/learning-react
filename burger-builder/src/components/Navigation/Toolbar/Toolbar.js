import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle drawerToggleClicked={props.sideDrawerToggleClicked}/>
        <Logo height="80%" margin="0"/>
        <div className={classes.DesktopOnly}>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    </header>
);
   
export default toolbar;