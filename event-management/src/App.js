import './App.css';
import EventDetails from './components/EventDetails';
import EventList from './components/EventList';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { makeServer } from './server/mockServer';

function App() {


if (process.env.NODE_ENV === 'development') {
  makeServer(); // Initialize the mock server only during development
}

// Rest of your application code...

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
