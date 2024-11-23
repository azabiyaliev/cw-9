import NavBar from './components/NavBar/NavBar.tsx';
import { Route, Routes } from 'react-router-dom';
import Categories from './containers/Categories/Categories.tsx';
import Home from './containers/Home/Home.tsx';


const App = () => {
 return (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/categories" element={<Categories/>} />
    </Routes>
  </>);
};

export default App;
