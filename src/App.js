import {BrowserRouter, Switch, Route} from 'react-router-dom'
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Room from './pages/Room'
import GamePage from './pages/GamePage'
import WaitingRoom from './pages/WaitingRoom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>
        <Route path="/register">
          <RegisterPage></RegisterPage>
        </Route>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route path="/room">
          <Room></Room>
        </Route>
        <Route exact path="/lobby/:name">
          <WaitingRoom></WaitingRoom>
        </Route>
        <Route exact path="/game/:name">
          <GamePage></GamePage>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
