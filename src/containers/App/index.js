import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

//pages
import Dashboard from "../../containers/dashboard";
import DataPreview from "../dataPreview";
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import Footer from "../../components/Footers/index.js";

//redux
import { Provider } from 'react-redux';
import { store } from '../../config/redux';

function App(){
    return(
        <>
        <IndexNavbar />
        <Provider store = {store}>
            <Router>
                <Switch>
                    <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
                    <Route path="/data-preview/:id" render={(props) => <DataPreview {...props} />} />
                    <Redirect to="/dashboard" />
                </Switch>
            </Router>
        </Provider>
        <Footer />
        </>
    )
}

export default App;