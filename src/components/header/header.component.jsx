import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import classes from './header.module.css'
import navLogo from '../../assets/images/tmdb.svg'

import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {

    return (
        <header>

            <Navbar className={classes.MainToolbar} collapseOnSelect expand='lg' bg='dark' variant='dark'>
                <Navbar.Brand href='/'>
                    <img style={{ width: '60px', }} alt='The movie db logo' src={navLogo} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                {/* create toggle for smaller devices */}
                <Navbar.Collapse style={{ padding: '0 2%' }} id='responsive-navbar-nav'>
                    <Nav className='mr-auto'>
                        <Nav.Link href='/'>Home</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href='/search'>Search</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>


        </header>
    )
}


export default Header;