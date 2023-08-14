import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'; 

function MainMovieSection() {
  const [index, setIndex] = useState(0);
  const [movies, setMovies] = useState([]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/now_playing?api_key=7f853d464ac954ff376525370120f3bd")
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderCarouselItems = () => {
    return movies.map((movie) => ( 
        <Carousel.Item key={movie.id} style={{ height: "100vh" ,width:"100%"}}>
        <img
          className="d-block w-100 img-fluid h-auto"
          src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
          alt={movie.title}
        />
        <Carousel.Caption>
          <h3>{movie.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>  
      ));
  };

  return ( 
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {renderCarouselItems()}
    </Carousel>
  );
}

export default MainMovieSection;
