import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className=''>
            <div>
                <img src="logo.png" alt="logo" />
            </div>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/allTouristSpot">AllTouristSpot</NavLink>
                <NavLink to="/addTouristSpot">AddTouristSpot</NavLink>
                <NavLink to="/myList">My List</NavLink>
                <NavLink to="/login">Login</NavLink>
            </nav>
            <div>

            </div>
        </div>
    );
};

export default Navbar