import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Login from './container/login';
import SignUp from './container/signup';
import Home from './container/home';
import Create from './container/create'
import NewsDetails from "./container/newsDetail";
import  PrivateRoutes  from "./container/PrivateRoutes";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple , green } from '@material-ui/core/colors';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  overrides: {
    MuiButton: {
      text: {
        color: 'white',
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true, 
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div>
       </div>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <PrivateRoutes path="/create">
            <Create />
          </PrivateRoutes>
          <PrivateRoutes path="/update/:id">
            <Create />
          </PrivateRoutes>
          <PrivateRoutes path="/news/:id">
            <NewsDetails />
          </PrivateRoutes>
          <PrivateRoutes excat={true} path="/watch-news">
            <Home />
          </PrivateRoutes>
          <Route excat={true} path="/">
            <Login />
          </Route>
        </Switch>
    </Router>
    <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
