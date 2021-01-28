import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MainPage from './pages/MainPage'
import Room from './pages/Room'
import GamePage from './pages/GamePage'
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>
        <Route path="/room">
          <Room></Room>
        </Route>
        <Route exact path="/game/:name">
          <GamePage></GamePage>
        </Route>
        <Route path="*">
          <MainPage></MainPage>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
