import AFRAME from 'aframe'

import 'babel-polyfill'
import React from 'react'
import {Entity} from 'aframe-react'

let extras = require( 'aframe-extras' )
extras.controls.registerAll()

AFRAME.registerComponent( 'cam0', {
    schema: {
        height: {type: 'number', default: 1.6}
    },
    init: function () {
        this.el.object3D.position.set( 0, 1.6, 5 )
    },
    update: function ( oldData ) {
        // console.log( '***************', this.el.sceneEl.object3D )
        this.el.object3D.position.y = this.data.height
    },

    remove: function () {

    },

    tick: function ( time, timeDelta ) {
    // Do something on every scene tick or frame.

    }
})
// universal-controls="movementControls: gamepad, keyboard"
const camera = ( props ) => {
    return (
        <Entity id="camera" camera="fov:40" look-controls wasd-controls cam0={`height: ${props.height}`} {...props}>
        </Entity>
    )
}

export default camera
