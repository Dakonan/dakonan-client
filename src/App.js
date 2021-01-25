import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Room from './pages/Room'
import GamePage from './pages/GamePage'
import WaitingRoom from './pages/WaitingRoom'
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
