import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

import Spinner from '../spinner/spinner.component';
import GetErrorHandler from '../getErrorHandler/getErrorHandler.component';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import instance from "../axios-instance/axios-instance";
import config from '../../config/config';

import noPoster from '../../assets/images/poster_not_avail.jpg';

import classes from './directory.module.css'

class Directory extends Component {

    constructor() {
        super()

        this.state = {
            popMovies: [],
            popTV: [],
            family: [],
            documentary: [],
            error: false,
            loading: true,
            redirecting: false,
            id: '',
            title: '',
            name: '',
            description: '',
            poster: '',
            popularity: '',
            vote: ''
        }
    }

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    clickHandler = () => {
        this.setState({ redirecting: true });
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

        const { history } = this.props;

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

        const params = {
            className: classes.carouselStyle,
            swipeable: true,
            draggable: false,
            showDots: false,
            responsive: responsive,
            ssr: false,
            infinite: true,
            keyBoardControl: true,
            containerClass: 'carousel-container',
            removeArrowOnDeviceType: ['tablet', 'mobile'],
            deviceType: this.props.deviceType,
            dotListClass: 'custom-dot-list-style',
            itemClass: 'carousel-item-padding-40-px'
        }

        const showItems = (items) => {
           const pathImg = 'https://image.tmdb.org/t/p/w185';
            if (items.length > 0) {
                return items.map(item => {
                    const movieId = item.id;
                    let poster = pathImg + item.poster_path;
                    return (
                        <div key={movieId}
                            className={classes.click}
                            onClick={() => history.push({
                                pathname: `/show/${movieId}`,
                                state: {
                                    id: item.id,
                                    title: item.title,
                                    name: item.name,
                                    description: item.overview,
                                    poster: poster,
                                    popularity: item.popularity,
                                    vote: item.vote_average
                                }
                            })
                            }>
                            {item.poster_path ?
                                <img
                                    className={classes.image}
                                    alt={`${item.title || item.name} poster`}
                                    src={poster} />
                                : (<img style={{maxHeight: '260px'}} src={noPoster} alt="no poster available"/>)
                            }
                            <p className={classes.title}>{item.title || item.name}</p>
                        </div>
                    )
                });
            }
            return (
                <div>
                    <p>Not found</p>
                </div>
            )

        }

        let movieShows = [...this.state.popMovies];
        let tvShows= [...this.state.popTV];
        let documentary = [...this.state.documentary];
        let family = [...this.state.family];

        let show = this.state.error ? <GetErrorHandler /> : <Spinner />

        if (this.state.popMovies.length > 0) {
            show = (
                <div className={classes.mainShowPage}>
                    <h2>Popular movies</h2>
                    <Carousel {...params}>
                        {showItems(movieShows)}
                    </Carousel>
                    <br />
                    <h2>Popular series</h2>
                    <Carousel {...params}>
                        {showItems(tvShows)}
                    </Carousel>
                    <br />
                    <h2>Documentaries</h2>
                    <Carousel {...params}>
                        {showItems(documentary)}
                    </Carousel>
                    <br />
                    <h2>For the family</h2>
                    <Carousel {...params}>
                        {showItems(family)}
                    </Carousel>
                </div>
            )
        }

        if (this.state.loading) {
            show = <Spinner />
        }


        return (
            <>
                {show}
            </>

        )
    }

}

export default withRouter(Directory);