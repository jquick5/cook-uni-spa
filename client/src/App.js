import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Landing from './components/pages/Landing';
import Alerts from './components/layout/Alerts';
import Login from './components/auth/Login';

import RecipeState from './context/recipe/RecipeState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ModalRoot from './modules/modals/components/ModalRoot';
import './App.css';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <RecipeState>
        <AlertState>
          <Router>
            <Fragment>
              <div id='body' className='landing'>
                <ModalRoot />
                <Navbar />

                <div className='container'>
                  <Alerts />
                  <Switch>
                    <Route exact path='/' component={Landing} />
                    <PrivateRoute exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <PrivateRoute exact path='/home' component={Home} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </div>
                <Footer />
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </RecipeState>
    </AuthState>
  );
};

export default App;
