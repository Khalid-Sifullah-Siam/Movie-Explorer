import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieListingPage from './pages/MovieListingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieListingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
