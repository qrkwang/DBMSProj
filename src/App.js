import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import {
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: 40,
    background: theme.background,
    textAlign: "center",
  },
  title: {
    paddingRight: "50px",
    color: (props) => props.color,
  },
  link: {
    // color: theme.color,
    "&:hover": {
      opacity: 0.5,
    },
  },
  icon: {
    borderRight: "3px solid black",
    fontSize: "50px",
    color: "black",
    paddingRight: "20px",
  },
}));

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
  const classes = useStyles({});

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          <Typography
            href="/"
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              // href="/"
              color="inherit"
            >
              Book
            </Link>{" "}
          </Typography>
          <Typography
            href="/checkbooking"
            variant="h6"
            className={classes.title}
          >
            <Link
              to="/checkbooking"
              style={{ textDecoration: "none", color: "white" }}
              // href="/checkbooking"
              color="inherit"
            >
              Check Bookings
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>
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
