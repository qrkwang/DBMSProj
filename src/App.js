import logo from "./logo.svg";
import "./App.css";
import {
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Paper,
} from "@material-ui/core";
import HotelOutlinedIcon from "@material-ui/icons/HotelOutlined";
import Moment from "react-moment";

import {
  useLocation,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

//material UI
import React, { useRef, useState, useEffect } from "react";
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
import ReactDOM from "react-dom";

//Made axios global
const axios = require("axios"); //use axios for http requests
const instance = axios.create({ baseURL: "http://localhost:8080" }); //use this instance of axios for http requests

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
  paperModal: {
    boxShadow: "none",
    paddingLeft: "5vw",

    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

const Login = (props) => {
  const classes = useStyles({});
  let history = useHistory(); //Navigation

  //States
  const [open, setOpen] = useState(false); //Open or close modal;
  const [modalType, setModalType] = useState("empty"); //State for modalType to let modal appear as the specific type. (e.g. invalid, error)
  //Modal Functions
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { register, handleSubmit, errors } = useForm();

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
            setModalType("invalid");
            setOpen(true);
          } else {
            console.log(responseData[0].address);
            console.log("customerID is ", responseData[0].customerid);

            history.push({
              pathname: "/Dashboard",
              state: { currentUserId: responseData[0].customerid },
            });
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
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              <div style={{ color: " grey" }}>Login</div>
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
              // href="/login"
              color="inherit"
            >
              Sign Up
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
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
                <h2> Invalid Login Details </h2>
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

const Register = (props) => {
  const classes = useStyles({});
  //States
  const [open, setOpen] = useState(false); //Open or close modal;
  const [modalType, setModalType] = useState("empty"); //State for modalType to let modal appear as the specific type. (e.g. invalid, error)

  let history = useHistory(); //Navigation

  //Modal Functions
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    history.push("/");
    setOpen(false);
  };

  const { register, handleSubmit, control } = useForm();

  const validateRegister = (data) => {
    console.log(data);

    if (
      data.name == "" ||
      data.address == "" ||
      data.contactno == "" ||
      data.email == "" ||
      data.password == ""
    ) {
      setModalType("empty");

      setOpen(true);
    } else {
      //Not empty, proceed with calling API
      console.log("ID", data.email);
      console.log("pw", data.password);

      instance
        .post("/user/create", {
          name: data.name,
          address: data.address,
          contactno: data.contactno,
          username: data.email,
          password: data.password,          
        })
        .then(function (response) {
          var responseData = response.data;
          console.log(typeof responseData);
          console.log(response);
          // name, username, password, address, contactno;
          if (response.data == "Success") {
            console.log("added");
            setModalType("added");
            setOpen(true);
          } else if (response.data == "isExist") {
            setModalType("exist");
            setOpen(true);
            console.log("account already exists");
          } else {
            console.log(response);
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
            onSubmit={handleSubmit((data) => validateRegister(data))}
            className={classes.form}
            noValidate
            style={{ paddingTop: "10px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  inputRef={register}
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  inputRef={register}
                  required
                  fullWidth
                  id="address"
                  label="Home Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  inputRef={register}
                  required
                  type="number"
                  fullWidth
                  id="contactno"
                  label="Contact Number"
                  name="contactno"
                  autoComplete="contactno"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  inputRef={register}
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
                  inputRef={register}
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
              className={useStyles.submit}
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
          <Modal center open={open} onClose={onCloseModal}>
            {modalType === "empty" ? (
              <div>
                <h2> Empty fields</h2>
                <p>Please fill in all fields before signing up.</p>
              </div>
            ) : modalType === "added" ? (
              <div>
                <h2> User Created</h2>
                <p>You can proceed to login now.</p>
              </div>
            ) : modalType === "exist" ? (
              <div>
                <h2> Account Exists </h2>
                <p>Account already exists.</p>
              </div>
            ) : (
              <div>
                <h2> Error Fetching </h2>
                <p>Please contact the administrator.</p>
              </div>
            )}
          </Modal>
        </div>
      </Container>
    </div>
  );
};

const CheckBooking = () => {
  const classes = useStyles();
  //States
  const [open, setOpen] = useState(false); //Open or close modal;
  const [modalType, setModalType] = useState("empty"); //State for modalType to let modal appear as the specific type. (e.g. invalid, error)
  const [bookingItem, setbookingItem] = useState("");

  //Modal Functions
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const inputBookingIdRef = useRef();

  const validateBookingId = () => {
    let input = inputBookingIdRef.current.value;
    console.log("clicked", input);
    if (input == "") {
      setModalType("empty");
      setOpen(true);
    } else {
      const url = `/booking/${input}`;

      instance
        .get(url)
        .then(function (response) {
          var responseData = response.data;
          console.log(typeof responseData);
          console.log(responseData);
          if (Array.isArray(responseData)) {
            if (responseData.length == 0) {
              setModalType("invalid");
              setOpen(true);
            } else {
              // responseData[0].checkindate = "";
              // responseData[0].checkoutdate = "";
              setbookingItem(responseData[0]);
              setModalType("found");
              setOpen(true);
            }
          } else {
            //Not array, was returned some other things.
            console.log("not an array");
          }
        })
        .catch(function (error) {});
    }
  };
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
          <TextField
            margin="normal"
            fullWidth
            inputRef={inputBookingIdRef}
            id="email"
            label="Enter your Booking Number"
            name="email"
            autoFocus
            style={{ paddingBottom: "20px" }}
          />
          <Button
            onClick={() => validateBookingId()}
            variant="contained"
            color="primary"
          >
            <text style={{ fontSize: "17px" }}>Enter</text>
          </Button>
          <Modal
            closeOnOverlayClick={false}
            center
            open={open}
            onClose={onCloseModal}
          >
            {modalType === "invalid" ? (
              <div>
                <h2> Invalid Booking ID </h2>
                <p>Your booking could not be found.</p>
              </div>
            ) : modalType === "empty" ? (
              <div>
                <h2> Empty fields</h2>
                <p>Please fill in all fields before logging in.</p>
              </div>
            ) : modalType === "found" ? (
              <div>
                <h2 style={{ textAlign: "center" }}> Booking details</h2>

                <Grid container spacing={1}>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>Hotel Name:</Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      {bookingItem.hotelname}
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>Address:</Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      {bookingItem.address}
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>Room Type:</Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      {bookingItem.roomType}
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>Guests:</Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      {bookingItem.numofguest}
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>Check In Date:</Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      <Moment format="D MMM YYYY">
                        {bookingItem.checkindate}
                      </Moment>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                    <Paper className={classes.paperModal}>
                      Check Out Date:
                    </Paper>
                  </Grid>
                  <Grid item xs={7}>
                    <Paper
                      style={{ paddingLeft: "2vw" }}
                      className={classes.paperModal}
                    >
                      <Moment format="D MMM YYYY">
                        {bookingItem.checkoutdate}
                      </Moment>
                    </Paper>
                  </Grid>
                </Grid>
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

const Dashboard = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  let receivedUserId = location.state.currentUserId;

  const [currentUserId, setcurrentUserId] = useState(receivedUserId);

  return (
    <div>
      {/* Personalized toolbar for each specific page */}
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          <Typography
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to={{
                pathname: "/dashboard",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              <div style={{ color: " grey" }}>Home</div>
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: "white",
              }}
              color="inherit"
            >
              Profile
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={{
                pathname: "/mybookings",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              My Bookings
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Logout
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Show Hotel listing here {currentUserId}
          </Typography>
        </div>
      </Container>
    </div>
  );
};
const MyBookings = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  let receivedUserId = location.state.currentUserId;
  const [myBookingList, setmyBookingList] = useState([]);
  const [currentUserId, setcurrentUserId] = useState("");

  useEffect(() => {
    setcurrentUserId(receivedUserId);
    console.log(receivedUserId);
  }, [receivedUserId]);

  //Use this to stop first render from triggering axios request which leads to error
  const isFirstRun = useRef(true);

  useEffect(() => {
    //if first render, don't do anything
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log("do fetching here", currentUserId);
    const url = `/booking/customer/${currentUserId}`;

    instance
      .get(url)
      .then(function (response) {
        var responseData = response.data;
        console.log(typeof responseData);
        console.log(responseData);
        if (Array.isArray(responseData)) {
          console.log("is an array");
          setmyBookingList(responseData);
        } else {
          //Not array, was returned some other things.
          console.log("not an array");
        }
      })
      .catch(function (error) {});
  }, [currentUserId]);

  return (
    <div>
      {/* Personalized toolbar for each specific page */}
      <AppBar position="static">
        <Toolbar>
          <HotelOutlinedIcon className={classes.icon}></HotelOutlinedIcon>
          <Typography
            variant="h6"
            style={{ paddingLeft: "30px" }}
            className={classes.title}
          >
            <Link
              to={{
                pathname: "/dashboard",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Home
            </Link>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: "white",
              }}
              color="inherit"
            >
              Profile
            </Link>
          </Typography>
          <Typography
            href="/checkbooking"
            variant="h6"
            className={classes.title}
          >
            <Link
              to={{
                pathname: "/mybookings",
                state: { currentUserId: currentUserId },
              }}
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              <div style={{ color: " grey" }}>My Bookings</div>
            </Link>
          </Typography>
          <Typography
            href="/checkbooking"
            variant="h6"
            className={classes.title}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              color="inherit"
            >
              Logout
            </Link>{" "}
          </Typography>{" "}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs" style={{ paddingTop: "20px" }}>
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            My Bookings
          </Typography>
          {myBookingList.map((row) => (
            <div>
              <p>{row.checkindate}</p>
              <p>{row.checkoutdate}</p>
            </div>
          ))}
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

        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Route path="/mybookings">
          <MyBookings />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
