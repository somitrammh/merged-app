import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import AppA from './components/AppA/AppA';
import AppB from './components/AppB/AppB';
// import StepForm from './components/AppB/StepForm';

function App() {
  return (
    <Router>
        <Routes>
          {/* Define route for AppA */}
          <Route exact path="/" element={<AppA />} />
            <Route exact path="/survey-form" element={<AppA />} />

            <Route exact path="/response/:slug" element={<AppB />} />
         
        </Routes>
    </Router>
  );
}

export default App;
