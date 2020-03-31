import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'; // import the Shaka player video configuration component 


import classes from './showItem.module.css';

const ShowItem = (props) => {
    const locState = props.location.state;

    let player = null;
    const [isPlayer, setIsPlayer] = useState(false);

    // function called at pressing the esc button to close the full screen and exit the player
    const escFunction = () => {

        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            setIsPlayer(false);
        }
    }

    useEffect(() => {

        //listener for various browsers for checking the fullscreen option
        document.addEventListener('fullscreenchange', escFunction);
        document.addEventListener('webkitfullscreenchange', escFunction);
        document.addEventListener('mozfullscreenchange', escFunction);
        document.addEventListener('MSFullscreenChange', escFunction);

        return () => {
            document.removeEventListener('fullscreenchange', escFunction);
            document.removeEventListener('webkitfullscreenchange', escFunction);
            document.removeEventListener('mozfullscreenchange', escFunction);
            document.removeEventListener('MSFullscreenChange', escFunction);

        }
    }, []);

    // onclick setting player to true 
    const showPlayer = (e) => {
        e.preventDefault();
        setIsPlayer(true);
    }

    // if player is true, show the component
    if (isPlayer) {
        player = (<VideoPlayer image={props.location.state.poster} />)
    }
    if (locState) {
        return (
            <div className={classes.mainDiv}>
                <div className={classes.col1}>
                    <h1>{locState.title || locState.name}</h1>
                    <h3>Description</h3>
                    <p>{locState.description}</p>
                    <hr />
                    <p>Popularity: {locState.popularity}</p>
                    <p style={{ paddingBottom: '5%' }}>Vote: {locState.vote}</p>

                    {/* show the button if the player is unactive */}
                    {!player ? <button className={classes.buttonShow} onClick={showPlayer}>Watch the trailer</button> : null}

                    <br />

                    {/* show the player component */}
                    {player}

                </div>

                <div className={classes.col2}>
                    {locState.poster ?
                        <img alt={`${locState.title} poster`} src={locState.poster} />
                        : `Poster not available`
                    }
                </div>

            </div>
        )

    }
    return <Redirect to="/" />
}

export default withRouter(ShowItem)