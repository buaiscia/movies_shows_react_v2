import React, { Component } from 'react';

import instance from "../axios-instance/axios-instance";
import config from '../../config/config'; 

class Directory extends Component {

    constructor() {
        super()

        this.state = {
            popMovies: [],
            popTV: [],
            family: [],
            documentary: [],
            error: false,
            loading: true
        }
    }

    componentDidMount() {
        instance.get(`discover/movie?sort_by=popularity.desc&api_key=${config.apiKey}`)   //use Axios instance and make a GET req to TMDB API
            .then(res => {
                const popMovies = res.data.results;             //save the results in new object
                popMovies ? this.setState({ popMovies }) : this.setState({ error: true })
            })
            .catch(error => { this.setState({ error: true }) });

        instance.get(`discover/tv?sort_by=popularity.desc&api_key=${config.apiKey}`)
            .then(res => {
                const popTV = res.data.results;
                popTV ? this.setState({ popTV }) : this.setState({ error: true })
            })
            .catch(error => { this.setState({ error: true }) });


        instance.get(`discover/movie?with_genres=10751&api_key=${config.apiKey}`)

            .then(res => {
                const family = res.data.results;
                family ? this.setState({ family }) : this.setState({ error: true })
            })
            .catch(error => { this.setState({ error: true }) });

        instance.get(`discover/movie?with_genres=99&api_key=${config.apiKey}`)

            .then(res => {
                const documentary = res.data.results;
                documentary ? this.setState({ documentary }) : this.setState({ error: true })

            })
            .catch(error => { this.setState({ error: true }) });

        this.setState({ loading: false })
    }

    render() {

        const responsive = {
            superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 5,
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
                slidesToSlide: 3, // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2, // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1, // optional, default to 1.
            },
        };

        console.log(this.state.popMovies);
        

        return (
            <div>
                <h1>showpage</h1>
            </div>
        )
    }

}

export default Directory;