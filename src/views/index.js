'use strict'

// Node Modules
import React, { Component } from 'react'
import {
    HashRouter as Router,
    Route,
    NavLink as Link
  } from 'react-router-dom'

// Views
import Alter from './Alter'
import Dashboard from './Dashboard'
import Exercise from './Exercise'
import Splash from './Splash'
import Workout from './Workout'

export default class Main extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return (<Router><div className="ract-app">
            <main id="content">
                <Route exact path="/create/workout/:workout/exercise/:exercise/set" component={ Alter } />
                <Route exact path="/edit/workout/:workout/exercise/:exercise" component={ Alter } />
                <Route exact path="/workout/:workout/exercise/:exercise" component={ Exercise } />
                <Route exact path="/create/workout/:workout/exercise" component={ Alter } />
                <Route exact path="/edit/workout/:id" component={ Alter } />
                <Route exact path="/create/workout" component={ Alter } />
                <Route exact path="/workout/:id" component={ Workout } />
                <Route exact path="/dashboard" component={ Dashboard } />
                <Route exact path="/" component={ Splash } />
            </main>
        </div></Router>);
    }
}