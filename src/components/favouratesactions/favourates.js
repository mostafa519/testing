// Favorites.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from './favoritesActions';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Favorites() {
  const favorites = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (movieId) => {
    dispatch(removeFromFavorites(movieId));
  };

  return (
    <Container fluid>
      <Row>
        {favorites.map((movie) => (
          <Col key={movie.id} className="mb-4">
            <Card className="h-100" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <Card.Title>MovieName: {movie.title}</Card.Title>
                </div>
                <div className='d-flex'>
                <Link to={`/MovieDetails/${movie.id}`}>
                  <Button variant="danger">Details</Button>
                </Link>
              <Button
                variant="btn btn-outline-warning ms-4"
                onClick={() => handleRemoveFromFavorites(movie.id)}
              >
                Remove 
              </Button>
              </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Favorites;
