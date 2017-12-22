import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons: [
			{id:'1',name: 'mfcccv',age: 20},
			{id:'2',name: 'medccf',age: 14},
			{id:'3',name: 'yocu',age: 29}
		],
		areVisible: false
	}

	switchNameHandler = (newName) => {
		console.log ('was clicked');
		this.setState({
			persons: [
				{name: newName,age: 30},
				{name: 'kyae',age: 124},
				{name: 'you',age: 29}
			]}
		)
	}

	nameChangedHandler = (event, id) => {
		const personIndex = this.state.persons.findIndex( p => {
			return p.id === id;
		});

		const person = {
			...this.state.persons[personIndex]
		};
		person.name = event.target.value
		
		const persons = [...this.state.persons]
		persons[personIndex] = person;
		
		this.setState({persons:persons})
		
	}
	togglePersonHandler = () => {
		this.setState ({areVisible:!this.state.areVisible});
	}
	deletePersonHandler = (personIndex) => {
		//const persons = this.state.persons.slice(); // empty slice will effectively copy array in full.
		const persons = [...this.state.persons]
		persons.splice(personIndex,1)
		this.setState({persons:persons})
	}

	render() {
		const style = {
			key:0,
			backgroundColor: 'grey',
			color: 'white',
			font: 'inherit',
			padding: '10px',
			cursor: 'pointer',
			':hover': {
				backgroundColor: 'blue',
				color: 'black',
			}
		};
		let styleCardHolder = {
			key:1,
			backgroundColor:'red',
			opacity:0.5,
			transition:'200ms',
			':hover': {
				backgroundColor: 'blue',
				color: 'black',
			}

		};
		let people = null;
		if (this.state.areVisible) {
			styleCardHolder.opacity = 1;
			people = (
			<div style={styleCardHolder} key={styleCardHolder.key}>
				{this.state.persons.map((person, index) => {
					return <Person
						name={person.name}
						age={person.age}
						key={person.id}
						click={() => this.deletePersonHandler(index)} 
						changed={(event) => this.nameChangedHandler(event, person.id)}
					/>
				})}
			</div> )
		
		style.backgroundColor = 'red';
		styleCardHolder.opacity = 1;
		}

		const classes = ['App-intro'];
		if (this.state.persons.length < 3)
		{
			classes.push('red');
		}
		if (this.state.persons.length < 2)
		{
			classes.push('reg');
		}
		const classString = classes.join(' ');
		console.log (classString);

	  return (
		<StyleRoot>
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<h1 className={classString}>Welcome to Reacted</h1>
			</header>
			<p className="App-intro">This is an intro</p>
			<button 
			style={style}
				onClick={() => this.togglePersonHandler('hello')}>Press me aa
			</button>
			{people}
		</div>
		</StyleRoot>
		);
	}
  }
  
  export default Radium (App);

