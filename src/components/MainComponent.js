import React, { Component } from 'react';
import { Navbar} from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {

    render() {
        const HomePage = () => {
            return (
                <Home
                />
            );
        }
    return (
            <div>
                <Navbar dark >
                </Navbar>
                <Header />
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/menu' component={() => <Menu dishes={DISHES} />} />
                <Redirect to="/home" />
            </Switch>
                <Footer />
            </div>
        );
    }
}

export default Main;