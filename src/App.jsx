import './App.css';

import { Switch, Route } from 'react-router-dom';

// components 
import Home from './pages/home/home';
import Header from './components/Header/Header';

function App() {
    return (
      <>
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
      </>
  );

}

export default App;
