import React, {Component} from 'react'
import Radium, {StyleRoot} from 'radium'

import 'aframe'
import {Entity, Scene} from 'aframe-react'
import Assets from 'aframe-react-assets'

import MenuBar from './Containers/MenuBar/MenuBar'

import rootAssets from './aframe/AssetManagement/rootAssets.js'
import Cheesecake from './aframe/Component/Cheesecake/Cheesecake'
import Camera from './aframe/Component/Camera/Camera'

import './App.css'

class App extends Component {
    state = {
        camHeight: 1.7,
        event: 'anEvent',
        messageFromButton: 'my message from app',
        assetsLoading: true,
        assetLoaded: 0,
        assetTotal: 1,
        assetCurrentItem: null,
        assetCurrentLoadedBytes: 0,
        assetCurrentTotalBytes: 1
    }

    /**
     * NOTE: react ele and aframe ele is distinct, so plz carefully when get ele from react `ref`
     */
    sceneInstance = null;
    onClick1Handler = () => {
        let newMessage = 'this is a message from a button click'
        console.log( 'did click the button' )
        this.setState({messageFromButton: newMessage, event: 'newEvent'})
    }
    onClick2Handler = () => {
        this.setState({camHeight: Math.random() * 10})
    }

    componentDidMount () {
        // this.props.setSceneInstance(this.sceneInstance);
        // this.props.setSceneEnterVRCallBack(this.sceneInstance.el.enterVR);
    }

    updateAssetsLoadingStatus = ( status ) => {
        this.setState({
            assetsLoading: status
        })
    }

    updateAssetsLoadingInfo = ( {assetLoaded, assetTotal, assetCurrentItem} ) => {
        this.setState({assetLoaded, assetTotal, assetCurrentItem} )
    }
    updateAssetsCurrentInfo = ( {assetCurrentLoadedBytes, assetCurrentTotalBytes}) => {
        this.setState({assetCurrentLoadedBytes, assetCurrentTotalBytes})
    }
    render () {
        /* polyfil    for ie11 rendering */
        ( function () {
            if ( typeof window.CustomEvent === 'function' ) return false

            function CustomEvent ( event, params ) {
                var evt = document.createEvent( 'CustomEvent' )
                params = params || {bubbles: false, cancelable: false, detail: undefined}
                evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail )
                return evt
            }

            CustomEvent.prototype = window.Event.prototype
            window.CustomEvent = CustomEvent
        } )()

        return (
            <div>
                <div>
                    <MenuBar button1Clicked={this.onClick1Handler} button2Clicked={this.onClick2Handler} />
                    <p>hello</p>
                    <Scene
                        light="defaultLightsEnabled: false"
                        vr-mode-ui="enabled: true">
                        <Assets
                            assets={rootAssets}
                            timeout={4e4}
                            interval={200}
                            debug={false}
                            onLoad={this.updateAssetsLoadingStatus}
                            onLoadingBySize={this.updateAssetsCurrentInfo}
                            onLoadingByAmount={this.updateAssetsLoadingInfo}>
                        </Assets>
                        <Entity primitive='a-sky' color="#000"></Entity>
                        <Camera height={this.state.camHeight} />
                        <Entity geometry={{primitive: 'box', width: 3}} material={{color: 'blue'}} position="0 5 -5" />
                        <Cheesecake event={this.state.event} message={this.state.messageFromButton} id="CheesecakeEntity" log={`event:default; message: hello a message`} collada-model="#objCheesecakeDae" position="0 0 0" rotation="0 0 0" />
                    </Scene>
                </div>
            </div >
        )
    }
}

export default App
