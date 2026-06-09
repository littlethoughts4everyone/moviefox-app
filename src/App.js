import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppLayout from './AppLayout';
import Home from './components/Home';
import FindMovies from './components/FindMovies';
import RevenueLists from './components/RevenueLists';
import People from './components/People';
import CharacterGuessingGame from './components/CharacterGuessingGame';
import './App.css';
import "charts.css/dist/charts.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route index element={<Home />} />
          <Route path="findmovies" element={<FindMovies />} />
          <Route path="revenuelists" element={<RevenueLists />} />
          <Route path="people" element={<People />} />
          <Route path="characterguessinggame" element={<CharacterGuessingGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
