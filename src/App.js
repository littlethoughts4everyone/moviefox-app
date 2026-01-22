import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppLayout from './AppLayout';
import ActorMutualMovies from './components/ActorMutualMovies';
import RevenueLists from './components/RevenueLists';
import PeopleTrivia from './components/PeopleTrivia';
import FindMovies from './components/FindMovies';
import CharacterGuessingGame from './components/CharacterGuessingGame';
import './App.css';
import "charts.css/dist/charts.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route path="mutualmovies" element={<ActorMutualMovies />} />
          <Route path="revenuelists" element={<RevenueLists />} />
          <Route path="peopletrivia" element={<PeopleTrivia />} />
          <Route path="findmovies" element={<FindMovies />} />
          <Route path="characterguessinggame" element={<CharacterGuessingGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
