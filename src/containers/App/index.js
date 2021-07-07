import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

//pages
import Dashboard from "../../containers/dashboard";
import NucleoIcons from "../../views/NucleoIcons.js";
import Login from "../login";
import LandingPage from "../../views/examples/LandingPage.js";
import ProfilePage from "../../views/examples/ProfilePage.js";
import RegisterPage from "../../views/examples/RegisterPage.js";

//redux
import { Provider } from 'react-redux';
import { store } from '../../config/redux';

function App(){
    return(
        <Provider store = {store}>
            <Router>
                <Switch>
                    <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
                    <Route
                        path="/nucleo-icons"
                        render={(props) => <NucleoIcons {...props} />}
                    />
                    <Route
                        path="/login-page"
                        render={(props) => <Login {...props} />}
                    />
                    <Route
                        path="/landing-page"
                        render={(props) => <LandingPage {...props} />}
                    />
                    <Route
                        path="/profile-page"
                        render={(props) => <ProfilePage {...props} />}
                    />
                    <Route
                        path="/register-page"
                        render={(props) => <RegisterPage {...props} />}
                    />
                    <Redirect to="/dashboard" />
                </Switch>
            </Router>
        </Provider>
    )
}

export default App;