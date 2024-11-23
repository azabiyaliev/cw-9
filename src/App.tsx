import NavBar from './components/NavBar/NavBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Categories from './containers/Categories/Categories.tsx';


const App = () => {
 return (
  <>
    <NavBar />
    <Routes>
      <Route path="/categories" element={<Categories/>} />
    </Routes>
  </>);
};

export default App;
