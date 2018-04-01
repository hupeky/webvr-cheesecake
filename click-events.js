import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';

import AFRAME from 'aframe';
require( 'aframe-event-set-component' );

class App extends Component {
    state = {
      persons: [
        {id: '1', name: 'mfcccv', age: 20},
        {id: '2', name: 'medccf', age: 14},
        {id: '3', name: 'yocu', age: 30}
      ],
      areVisible: false,
      color: 'purple'
    }

    componentDidMount () {
      console.log( 'did mount' );
      AFRAME.registerComponent( 'cursor-listener', {
        init: function () {
          var lastIndex = -1;
          var COLORS = ['red', 'green', 'blue'];
          this.el.addEventListener( 'click', function ( evt ) {
            lastIndex = ( lastIndex + 1 ) % COLORS.length;
            this.setAttribute( 'material', 'color', COLORS[lastIndex] );
            console.log( 'I was clicked at: ', evt.detail.intersection.point );
          });
        }
      });

      AFRAME.registerComponent( 'refresh-obj', {
        init: function () {
          this.el.addEventListener( 'click', function ( evt ) {
            var mycursor = document.querySelector( '#mycursor' );
            mycursor.components.raycaster.refreshObjects();
            console.log( mycursor.components.raycaster );
          });
        }
      });
    }

    switchNameHandler = ( newName ) => {
      console.log( 'was clicked' );
      this.setState({
        persons: [
          {name: newName, age: 30},
          {name: 'kyae', age: 124},
          {name: 'you', age: 29}
        ]
      }
      );
    }

    nameChangedHandler = ( event, id ) => {
      const personIndex = this.state.persons.findIndex( p => {
        return p.id === id;
      });

      const person = {
        ...this.state.persons[personIndex]
      };
      person.name = event.target.value;

      const persons = [...this.state.persons];
      persons[personIndex] = person;

      this.setState({persons: persons});
    }
    togglePersonHandler = () => {
      console.log( 'set state to black' );
      this.setState({areVisible: !this.state.areVisible, color: 'black'});
    }
    deletePersonHandler = ( personIndex ) => {
      // const persons = this.state.persons.slice(); // empty slice will effectively copy array in full.
      const persons = [...this.state.persons];
      persons.splice( personIndex, 1 );
      this.setState({persons: persons});
    }

    render () {
      /* polyfil    for ie11 rendering */
      ( function () {
        if ( typeof window.CustomEvent === 'function' ) return false;

        function CustomEvent ( event, params ) {
          var evt = document.createEvent( 'CustomEvent' );
          params = params || {bubbles: false, cancelable: false, detail: undefined};
          evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
          return evt;
        }

        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
      })();

      let styleCardHolder = {
        key: 1,
        backgroundColor: 'red',
        opacity: 0.5,
        transition: '200ms',
        ':hover': {
          backgroundColor: 'blue',
          color: 'black'
        }

      };
      let people = null;
      let btnClass = '';
      if ( this.state.areVisible ) {
        styleCardHolder.opacity = 1;
        people = (
          <div style={styleCardHolder} key={styleCardHolder.key}>
            {this.state.persons.map( ( person, index ) => {
              return <Person
                name={person.name}
                age={person.age}
                key={person.id}
                click={() => this.deletePersonHandler( index )}
                changed={( event ) => this.nameChangedHandler( event, person.id )}
              />;
            })}
          </div> );
        styleCardHolder.opacity = 1;
      }

      const classes = ['App-intro'];
      if ( this.state.persons.length < 3 ) {
        classes.push( 'red' );
      }
      if ( this.state.persons.length < 2 ) {
        classes.push( 'reg' );
      }
      const classString = classes.join( ' ' );
      console.log( classString );

      return (
        <StyleRoot>
          <div styleName='App'>
            <header styleName='AppHeader'>
              <img src={logo} styleName='AppLogo' alt="logo" />
              <h1 styleName='App-title' >Welcome to Reacted</h1>
            </header>
            <p styleName='AppIntro'>This is an intrso</p>
            <p className="myP">This is an intro</p>
            <button
              className={btnClass}
              onClick={() => this.togglePersonHandler( 'hello' )}>Press meDDdsd
            </button>
            {people}
          </div>

          <div styleName='Embedded'>
            <a-scene>
              {/* synthetic events from cursor component:
                        click, mousenter, mouseleave, mousedown, mouseup, fusing */}

              {/* <a-camera> // a camera with a cursor
                            <a-cursor></a-cursor>
                        </a-camera> */}

              {/* <a-entity position="0 1.6 0" rotation="-12 0 0"> // default cursor with a raycaster component showing the line of the ray
                            <a-cursor raycaster="showLine: true"></a-cursor>
                        </a-entity> */}

              <a-entity id="box" geometry="primitive: box" material="color: red"></a-entity>

              <a-camera>
                <a-entity id="mycursor"
                  cursor="fuse: true; fuseTimeout: 1000" position="0 0 -1"
                  geometry="primitive: sphere; radius: 0.005"
                  material="color: #000000; shader: flat; opacity: 0.5"
                  raycaster="objects: .clickable">
                  <a-animation attribute="scale"
                    to="3 6 3"
                    dur="1000"
                    begin="cursor-fusing"
                    fill="backwards"
                    easing="linear">
                  </a-animation>
                </a-entity>
              </a-camera>

              {/* ********************* red boxes */}
              {/* <!-- Left red box  --> */}
              <a-box
                id="leftred"
                class="clickable"
                color="grey"
                position="-2 0 -7"
                event-set__enter="_event: mouseenter; material.color: #FF0000"
                event-set__leave="_event: mouseleave; material.color: #AA0000"
                event-set__target="_event: click; _target: #green; material.color: #00AAFF"
                event-set__clearclass="_event: click; class: not-clickable"
                event-set__tarclass="_event: click; _target: #green; class: clickable"
                refresh-obj>
              </a-box>

              {/* <!-- Center red box  --> */}
              <a-box
                id="middlered"
                class="clickable"
                color="yellow"
                position="0 0 -7"
                event-set__enter={`
                                _event: mouseenter; 
                                material.color: #FF0000`}
                event-set__leave={`
                                _event: mouseleave; 
                                material.color: #AA0000`}
                event-set__change-blue-pos="_event: click; _target: #blue; position: 0 3.5 -7"
                event-set__clearclass="_event: click; class: not-clickable"
                event-set__tarclass="_event: click; _target: #blue; class: clickable"
                refresh-obj>
              </a-box>

              {/* <!-- Right red box  --> */}
              <a-box
                id="rightred"
                class="clickable"
                color="#AA0000"
                position="2 0 -7"
                event-set__enter={`
                                _event: mouseenter; 
                                material.color: #FF0000`}
                event-set__leave={`
                                _event: mouseleave; 
                                material.color: #AA0000`}
                event-set__change-yellow-color="_event: click; _target: #yellow; material.color: red"
                event-set__clearclass="_event: click; class: not-clickable"
                event-set__tarclass="_event: click; _target: #yellow; class: clickable"
                refresh-obj>
              </a-box>

              {/* ********************* multi color boxes */}
              {/* <!-- Left green box  --> */}
              <a-box id="green" color={this.state.color} position="-2 3 -7"
                event-set__clearclass="_event: click; class: not-clickable"
                event-set__tarclass="_event: click; _target: #leftred; class: clickable"
                refresh-obj>

              </a-box>

              {/* <!-- Center blue box  --> */}
              <a-box id="blue" color="blue" position="0 3 -7"
                event-set__reset-blue-pos="_event: click; position: 0 3 -7"
                event-set__clearclass="_event: click; class: not-clickable"
                event-set__tarclass="_event: click; _target: #middlered; class: clickable"
                refresh-obj>
              </a-box>

              {/* <!-- Right yellow box  --> */}
              <a-box id="yellow" color="red" position="2 3 -7"
                event-set__change-yellow-color="_event: click; material.color: yellow"
                event-set__tarclass="_event: click; _target: #rightred; class: clickable"
                refresh-obj>
              </a-box>
            </a-scene>

          </div>

        </StyleRoot>
      );
    }
}

export default Radium( App );
