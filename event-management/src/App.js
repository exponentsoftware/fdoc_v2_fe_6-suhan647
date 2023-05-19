import './App.css';
import EventDetails from './components/EventDetails';
import EventList from './components/EventList';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>

    <BrowserRouter>
     <Routes>
      <Route path='/'  element={<EventList/>} />
      <Route path='/details/:id'  element={<EventDetails/>} />
     </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
