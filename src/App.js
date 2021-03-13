import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Switch } from "react-router-dom";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

const Home = () => (
  <div>
    <h2>Home Page</h2>{" "}
    <p> This is definitely not what our app will look like</p>
  </div>
);

const CheckBooking = () => (
  <div>
    <h2>Check Your Booking Here</h2>
  </div>
);

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/checkbooking">Check Booking</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/checkbooking">
          <CheckBooking />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
