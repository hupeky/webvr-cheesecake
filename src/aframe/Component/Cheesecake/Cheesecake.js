import AFRAME from 'aframe'
import 'babel-polyfill'
import {Entity} from 'aframe-react'
import React from 'react'
import objCheesecakeDae from './assets/aframeViewCheesecakes2.dae'

require( 'aframe-event-set-component' )

export default class Cheesecake extends React.Component {
    static Assets = [
        <a-asset-item id="objCheesecakeDae" src={objCheesecakeDae} alt="objCheesecakeDae" />
    ];

    componentDidMount () {
        AFRAME.registerComponent( 'log', {
            schema: {
                event: {type: 'string', default: ''},
                message: {type: 'string', default: 'Hello, World!'}
            },
            init: function () {
                let self = this
                this.eventHandlerFn = () => { console.log( 'hello' ) }
                console.log( THREE )
                this.el.addEventListener( 'model-loaded', function () {
                    
                    console.log( 'loaded' )
                    const scene = self.el.sceneEl.object3D
                    console.log( 'scene', scene )

                    let boxMesh = scene.getObjectByName( 'final_box_mesh2' )
                    let plastic = scene.getObjectByName( 'polySurface2' )

                    const envBack = 'assets/envmap/back.jpg'
                    const sphericalRef = 'assets/envmap/hallway_hdri_sphere.jpg'

                    let reflection = new THREE.CubeTextureLoader().setPath( './src/aframe/Component/Cheesecake/' ).load( [envBack, envBack, envBack, envBack, envBack, envBack] )
                    let refSpherical = new THREE.TextureLoader().setPath( './src/aframe/Component/Cheesecake/' ).load( sphericalRef )

                    refSpherical.mapping = THREE.SphericalReflectionMapping

                    boxMesh.material.envMap = reflection
                    boxMesh.material.combine = THREE.AddOperation
                    boxMesh.material.reflectivity = 0.2

                    plastic.material.envMap = refSpherical
                    plastic.material.combine = THREE.AddOperation
                    plastic.material.reflectivity = 0.4
                })
            },
            update: function ( oldData ) {
                var data = this.data
                var el = this.el

                // `event` updated. Remove the previous event listener if it exists.
                if ( oldData.event && data.event !== oldData.event ) {
                    el.removeEventListener( oldData.event, this.eventHandlerFn )
                }
                if ( data.event ) {
                    console.log( 'if ( data.event ) ', data.event )
                    el.addEventListener( 'anEvent', function () { console.log( `yo i did call the event handle rfunction` ) })

                    el.emit( 'anEvent' )
                    console.log( el )
                } else {
                    console.log( 'no data event', data.message )
                }

                // Do something when component's data is updated.
                console.log( 'message from update', this.data.message )
            },

            remove: function () {
                // Do something the component or its entity is detached.
                var data = this.data
                var el = this.el

                // Remove event listener.
                if ( data.event ) {
                    el.removeEventListener( data.event, this.eventHandlerFn )
                }
            },

            tick: function ( time, timeDelta ) {
                // Do something on every scene tick or frame.

            }
        })
    }
    render () {
        console.log( 'did render' )
        return (
            <Entity>
                <Entity {...this.props} material="roughness: 1" position="0 0 -1.5" />
            </Entity>
        )
    }
}
