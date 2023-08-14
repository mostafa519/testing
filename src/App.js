// App.js

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './components/favouratesactions/favoritesReducer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderNav from './components/header/header';
import NewReleases from './components/NewRelease/newrelease';
import MainMovieSection from './components/body/mainmovieSection/mainmoviesection';
import MovieRoller from './components/body/movieRoller/movieRolller';
import MovieDetails from './components/moviesdetails/moviesDetails';
import NotFound from './components/notfound/notfound';
import Footer from './components/footer/footer';
import Favorites from './components/favouratesactions/favourates';

const store = configureStore({
  reducer: favoritesReducer
});

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Provider store={store}>
      <div className="myDiv bg-dark vh-100">
        <HeaderNav onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchTerm={searchQuery} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/newrelease" element={<NewReleases />} />
          <Route path="/MovieDetails/:movieId" element={<MovieDetails />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
}

function Home({ searchTerm }) {
  return (
    <div className="bg-dark">
      <MainMovieSection />
      <MovieRoller searchTerm={searchTerm} />
    </div>
  );
}

export default App;
