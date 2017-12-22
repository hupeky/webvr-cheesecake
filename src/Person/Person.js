import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';

import './Person.css';
const Person = (props) => {
	const style = {
		'@media (min-width: 500px)': {
			width: '400px'
		}
	};
	return (
	
			<div style={style} className="Person">
				<p onClick={props.click}>I am {props.name}, and I am {props.age} years old</p>
				<p>{props.children}</p>
				<input type="text" onChange={props.changed} value={props.name} />
			</div>
	
	)
} 

export default Radium (Person);