import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

import GetErrorHandler from '../getErrorHandler/getErrorHandler.component';
import Spinner from '../spinner/spinner.component';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import instance from '../axios-instance/axios-instance';
import config from '../../config/config';

import classes from './searching.module.css';

class Searching extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
            searched: false,
            error: false,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    //function for input value change
    handleChange(event) {
        this.setState({ query: event.target.value })  // take the value from the input bar
        event.preventDefault();
    }

    //function for  submit form
    handleSubmit(event) {

        event.preventDefault();

        this.setState({ loading: true })

        const queryValue = this.state.query;

        this.getData(queryValue);

        this.setState({ searched: true }) // after fetching the results send them to new route

    }

    getData(queryValue) {
        instance.get(`search/multi?api_key=${config.apiKey}&query=${queryValue}`)
            .then(res => {
                const results = [...res.data.results];
                results ? this.setState({ results }) : this.setState({ error: true })
            })
            .catch(error => { this.setState({ error: true }) })
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
                slidesToSlide: 3,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
            },
        };

        const pathImg = 'https://image.tmdb.org/t/p/w185';

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
            if (items.length > 0) {
                return items.map(item => {
                    const movieId = item.id;
                    return (
                        <div key={movieId}
                            className={classes.click}
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
                                    className={classes.image}
                                    alt={`${item.title || item.name} poster`}
                                    src={item.poster} />
                                : (<div>
                                    <p>Poster not available</p>
                                </div>)
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

        const form = (
            <div style={{ textAlign: 'center' }}>
                <Form className={classes.form} onSubmit={this.handleSubmit} id='form'>
                    <FormControl
                        style={{ margin: '5% 0' }}
                        className='mr-sm-2'
                        type='text'
                        placeholder='Search...'
                        name='search'
                        value={this.state.query}
                        onChange={this.handleChange} />
                    <Button
                        variant='outline-success'
                        type='submit'>Submit
                        </Button>

                </Form>

            </div>
        )

        if (this.state.searched) {

            const results = [...this.state.results];
            let allResults = allShows(results)


            let show = this.state.error ? <GetErrorHandler /> : <Spinner />

            if (this.state.results.length > 0) {
                show = (
                    <div className={classes.mainSearchPage}>
                        <h2>Search results: </h2>
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
                            itemClass='carousel-item-padding-40-px'>
                            {showItems(allResults)}
                        </Carousel>
                    </div>
                )
            }



            return (
                <>
                    {form}
                    {show}
                </>
            )
        }

        return (
            <>
                {form}
            </>
        )

    }
}


export default withRouter(Searching);