import React from 'react'
import classes from './MenuBar.css'
const MenuBar = ( props ) => {
    return (
        <div className={classes.MenuBar}>
            <button onClick={props.button1Clicked}>Button 1</button>
            <button onClick={props.button2Clicked}>Change Cam Height</button>
        </div>
    )
}

export default MenuBar
