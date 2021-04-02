import logo from "./logo.svg";
import "./App.css";
import {
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";

import {
  useHistory,
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

//material UI
import React, { useRef, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

//Made axios global
const axios = require("axios"); //use axios for http requests
const instance = axios.create({ baseURL: "http://localhost:8080" }); //use this instance of axiosfor http requests

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

const Login = () => {
  const classes = useStyles({});

  //States
  const [open, setOpen] = useState(false); //Open or close modal;
  const [modalType, setModalType] = useState("empty"); //State for modalType to let modal appear as the specific type. (e.g. invalid, error)
  //Modal Functions
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { register, handleSubmit, control } = useForm();
  let history = useHistory(); //Navigation

  const validateUser = (data) => {
    if (data.email == "" || data.password == "") {
      setOpen(true);
      setModalType("empty");
    } else {
      //Not empty, proceed with calling API
      console.log("ID", data.email);
      console.log("pw", data.password);

      instance
        .post("/customer/login", {
          username: data.email,
          password: data.password,
        })
        .then(function (response) {
          var responseData = response.data;
          console.log(typeof responseData);

          if (response.data == false) {
            console.log("false");
          } else {
            history.push("/");

            // this.props.history.push("/Booking", {
            //   state: {
            //     currentUserId: responseData.customerid,
            //   },
            // });
          }
        })
        .catch(function (error) {
          setModalType("error");
          setOpen(true);
          console.log(error);
        });
    }
  };
  return (
    <div>
      {/* Personalized toolbar for each specific page */}
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          {/* <Typography
            href="/"
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to={{
                pathname: "/Booking",
                // state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              // href="/"
              color="inherit"
            >
              Book
            </Link>{" "}
          </Typography> */}
          <Typography
            href="/"
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              // href="/login"
              color="inherit"
            >
              <div style={{ color: " grey" }}>Login</div>
            </Link>
          </Typography>
          <Typography href="/register" variant="h6" className={classes.title}>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
              // href="/login"
              color="inherit"
            >
              Sign Up
            </Link>
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

      {/* Page section */}
      <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div className={useStyles.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            className={useStyles.form}
            noValidate
            onSubmit={handleSubmit((data) => validateUser(data))}
          >
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              inputRef={register}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={useStyles.submit}
            >
              Login
            </Button>
            <Grid container style={{ paddingTop: "10px" }}>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Modal center open={open} onClose={onCloseModal}>
            {modalType === "invalid" ? (
              <div>
                <h2> Invalid </h2>
                <p>Invalid username or password.</p>
              </div>
            ) : modalType === "empty" ? (
              <div>
                <h2> Empty fields</h2>
                <p>Please fill in all fields before logging in.</p>
              </div>
            ) : (
              <div>
                <h2> Error fetching</h2>
                <p>Please contact the administrator.</p>
              </div>
            )}
          </Modal>
        </div>
      </Container>
    </div>
  );
};

const Register = () => {
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  return (
    <div>
      {/* Personalized toolbar for each specific page */}
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
              color="inherit"
            >
              Login
            </Link>
          </Typography>
          <Typography href="/register" variant="h6" className={classes.title}>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "white",
              }}
              // href="/login"
              color="inherit"
            >
              <div style={{ color: " grey" }}>Sign Up</div>
            </Link>
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

      <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            style={{ paddingTop: "10px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container style={{ paddingTop: "10px" }}>
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

const CheckBooking = () => {
  const classes = useStyles();
  return (
    <div>
      {/* Personalized toolbar for each specific page */}
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
              color="inherit"
            >
              Login
            </Link>
          </Typography>
          <Typography href="/register" variant="h6" className={classes.title}>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "white",
              }}
              // href="/login"
              color="inherit"
            >
              Sign Up
            </Link>
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
              <div style={{ color: " grey" }}>Check Booking</div>
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Check Booking
          </Typography>
        </div>
      </Container>
    </div>
  );
};
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>

        <Route path="/checkbooking">
          <CheckBooking />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
