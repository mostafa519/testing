// MovieRoller.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../favouratesactions/favoritesActions";

function MovieRoller({ searchTerm }) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const favorites = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const loadMovies = () => {
    let url = searchTerm
      ? `https://api.themoviedb.org/3/search/movie?api_key=7a1c19ea3c361a4d3cc53eb70ef8298c&query=${searchTerm}&page=${currentPage}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=7a1c19ea3c361a4d3cc53eb70ef8298c&page=${currentPage}`;

    axios
      .get(url)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
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
  <Container  className="container-fluid">   
    <Row xs={1} xl={5}md={3}>
        {movies.map((movie) => (
          <Col key={movie.id} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                  <Card.Title>MovieName: {movie.title}</Card.Title>
                  <Link onClick={() => handleAddToFavorites(movie)}>
                    {isFavorite(movie) ? (
                      <AiFillHeart size={24} color="red" className="filled" />
                    ) : (
                      <AiOutlineHeart
                        size={24}
                        color="red"
                        className="bordered"
                      />
                    )}
                  </Link>
                </div>
                <Link to={`/MovieDetails/${movie.id}`}>
                  <Button variant="danger">Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="pt-4">
        <Col>
          <Button
            variant="secondary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous Page
          </Button>
        </Col>
        <Col className="text-end">
          <Button variant="secondary" onClick={handleNextPage}>
            Next Page
          </Button>
        </Col>
      </Row> 
      </Container>
 
  );
}

export default MovieRoller;


// <div className='container-fluid ps-5'>
// <div className="containerItemlist"> 
// <Row xs={5} md={5} className="main-design   pt-4">
// {movies.map((movie) => ( 
//   //  <Col key={movie.data.id} className="mb-4">
//     <Row xs={5} md={5} className="main-design   pt-4">
//      <Card className="h-100" style={{ width: "14rem" }}>

//      <ListItems key={ movie.id} index={movie.id} movie={movie.data} generss ={moviesGenre} />
     
//      </Card>
//      </Row>
//       // </Col>

// ))}
// </Row>
// </div>
// </div>