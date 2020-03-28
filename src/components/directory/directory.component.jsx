import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import instance from "../axios-instance/axios-instance";
import config from '../../config/config';

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
        // let { paramId } = useParams();

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

        const allShows = (shows) => {
            return shows.map(item => {
                let newObj = {
                    poster: item['poster_path'] ? pathImg + item['poster_path'] : null,
                    title: item['title'],
                    name: item['name'],
                    id: item['id'],
                    description: item['overview'],
                    popularity: item['popularity'],
                    vote: item['vote_average']
                }
                return newObj;
            });
        }


        const showItems = (items) => {
            return items.map(item => {
                // console.log(this.props.match.params.movieId);
                
                const movieId = item.id;
                return (
                    <div key={movieId}
                        onClick={() => history.push({
                            pathname: `/show/${movieId}`,
                            state: {
                                id: item.id,
                                title: item.title,
                                name: item.name,
                                description: item.description,
                                poster: item.poster,
                                popularity: item.popularity,
                                vote: item.vote
                            }
                        })
                        }>
                        {item.poster ?
                            <img
                                alt={`${item.title || item.name} poster`}
                                src={item.poster} />
                            : (<div>
                                <p>Poster not available</p>
                            </div>)
                        }
                        <p>{item.title || item.name}</p>
                    </div>
                )
            });
        }

        const pathImg = 'https://image.tmdb.org/t/p/w185';

        let movieShow = [...this.state.popMovies];
        let tvShow = [...this.state.popTV];
        let documentary = [...this.state.documentary];
        let family = [...this.state.family];

        let allPopMovies = allShows(movieShow);
        let allTvShows = allShows(tvShow);
        let allDocs = allShows(documentary);
        let allFamily = allShows(family);


        return (
            <div className={classes.mainShowPage}>
                <h2>Popular movies</h2>
                <Carousel
                    className={classes.carouselStyle}
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={false}
                    infinite={true}
                    keyBoardControl={true}
                    containerClass='carousel-container'
                    removeArrowOnDeviceType={['tablet', 'mobile']}
                    deviceType={this.props.deviceType}
                    dotListClass='custom-dot-list-style'
                    itemClass='carousel-item-padding-40-px'
                >
                    {showItems(allPopMovies)}
                </Carousel>
                <br />
                <h2>Popular series</h2>
                <Carousel
                    className={classes.carouselStyle}
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={false}
                    infinite={true}
                    keyBoardControl={true}
                    containerClass='carousel-container'
                    removeArrowOnDeviceType={['tablet', 'mobile']}
                    deviceType={this.props.deviceType}
                    dotListClass='custom-dot-list-style'
                    itemClass='carousel-item-padding-40-px'
                >
                    {showItems(allTvShows)}
                </Carousel>
                <br />
                <h2>Documentaries</h2>
                <Carousel
                    className={classes.carouselStyle}
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={false}
                    infinite={true}
                    keyBoardControl={true}
                    containerClass='carousel-container'
                    removeArrowOnDeviceType={['tablet', 'mobile']}
                    deviceType={this.props.deviceType}
                    dotListClass='custom-dot-list-style'
                    itemClass='carousel-item-padding-40-px'
                >
                    {showItems(allDocs)}
                </Carousel>
                <br />
                <h2>For the family</h2>
                <Carousel
                    className={classes.carouselStyle}
                    swipeable={true}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={false}
                    infinite={true}
                    keyBoardControl={true}
                    containerClass='carousel-container'
                    removeArrowOnDeviceType={['tablet', 'mobile']}
                    deviceType={this.props.deviceType}
                    dotListClass='custom-dot-list-style'
                    itemClass='carousel-item-padding-40-px'
                >
                    {showItems(allFamily)}
                </Carousel>
            </div>
        )
    }

}

export default withRouter(Directory);