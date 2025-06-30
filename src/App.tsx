import { Routes, Route} from 'react-router-dom';
import MainPage from './components/MainPage';
import PieteiktiesPage from './components/SecondPage';

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen text-gray-800">
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/pieteikties" element={<PieteiktiesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;