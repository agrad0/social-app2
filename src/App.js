import './App.css';

import AppRoutes from './routes/AppRoutes'
import AppNav from './views/AppNav';

function App() {
  return (
    <>
    <nav>
      <AppNav />
    </nav>
    <div className="App">
      <AppRoutes />
    </div>
    </>
  );
}




export default App;
