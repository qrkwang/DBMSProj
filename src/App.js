import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import {
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
//For GET/POST Request
import Axios from 'axios'

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

// const Home = () => (
//   <div>
//     <h2>Home Page</h2>{" "}
//     <p> This is definitely not what our app will look like</p>
//   </div>
// );
const CheckBooking = () => (
  <div>
    <h2>Check Booking</h2>{" "}
  </div>
);

const Login = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { register, handleSubmit, errors } = useForm();

  const validateUser = (data) => {
    if (data.email == "" || data.password == "") {
      setOpen(true);
    } else {
      console.log("ID", data.email);
      console.log("pw", data.password);
    }
  };
  return (
    <div>
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
            <div>
              <h2> Empty fields</h2>
              <p>Please fill in all fields before logging in.</p>
            </div>{" "}
          </Modal>
        </div>
      </Container>
    </div>
  );
};

const Register = () => {
  const classes = useStyles();

  //React Hook Form
  const { register, handleSubmit } = useForm();

  //Function that interacts with Express.js & MongoDB
  const createUser = (data) => {
    Axios.post('/customer/createuser', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    })
    .then(function (response) {
      console.log(response)
    })
  }

  return (
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

          //To Submit To Hook and call the createUser function that interacts with MongoDB
          onSubmit={handleSubmit((data) => createUser(data))}
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
                //Register FirstName Data Field to React Hook Form
                inputRef={register}
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
                inputRef={register}
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
                inputRef={register}
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
                inputRef={register}
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
  );
};
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
          <Typography href="/login" variant="h6" className={classes.title}>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
              // href="/login"
              color="inherit"
            >
              Login
            </Link>{" "}
          </Typography>{" "}
          <Typography href="/register" variant="h6" className={classes.title}>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
              // href="/login"
              color="inherit"
            >
              Sign Up
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>
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
