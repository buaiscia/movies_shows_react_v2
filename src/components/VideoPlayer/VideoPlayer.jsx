import React, { Component } from 'react';
import muxjs from 'mux.js'; // importing Mux.js for converting coding
import shaka from 'shaka-player';

class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        this.videoComponent = React.createRef();
        this.onErrorEvent = this.onErrorEvent.bind(this);
        this.onError = this.onError.bind(this);      
        window.muxjs = muxjs; // passing mux to the global environment
    }

    onErrorEvent(event) {
        // Extract the shaka.util.Error object from the event.
        this.onError(event.detail);
    }

    onError(error) {
        // Log the error.
        console.error('Error code', error.code, 'object', error);
    }

    componentDidMount() {
        
        // URI called only as pathname, root took as proxy
        var manifestUri = `/content/sintel/hls/playlist.m3u8`;

        const video = this.videoComponent.current;
        var player = new shaka.Player(video);
        player.configure('manifest.defaultPresentationDelay', 0);


        // Listen for error events.
        player.addEventListener('error', this.onErrorEvent);

        // Try to load a manifest.
        // This is an asynchronous process.
        player.load(manifestUri).then(function () {
            // This runs if the asynchronous load is successful.
            console.log('The video has now been loaded!');
            return this;
        })
            .catch(this.onError);  // onError is executed if the asynchronous load fails.

        // automatically go to full screen
        let screenPlayer = document.getElementById('screen-player');
        if (screenPlayer.requestFullscreen) {
            screenPlayer.requestFullscreen();
        }

    }

    render() {

        return (
            <video
                id='screen-player'
                ref={this.videoComponent}
                poster={this.props.image}
                controls
                autoPlay
            />
        );
    }

}

export default VideoPlayer;