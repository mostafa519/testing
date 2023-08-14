// HeaderNav.js
import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../favouratesactions/favoritesActions';
import "./header.css"
function HeaderNav({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const favorites = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const isFavorite = (movie) => {
    return favorites.some((favMovie) => favMovie.id === movie.id);
  };

  const handleAddToFavorites = (movie) => {
    if (isFavorite(movie)) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <Navbar bg="dark" expand="lg" className='Editting'> 
        <Link to="/" className="navbar-brand text-danger">
          Movie's Geeks
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll">menu</Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Link to="/" exact="true" className="nav-link text-danger">
              Home
            </Link>

            <Link to="/favorites" className="nav-link text-danger">
              Favorites ({favorites.length})
            </Link>

            <Link to="/" exact="true" className="nav-link text-danger">
              Newrelease
            </Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <Button variant="outline-danger" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse> 
    </Navbar>
  );
}

export default HeaderNav;
