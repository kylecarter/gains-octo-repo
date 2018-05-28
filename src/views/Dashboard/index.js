'use strict'

// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Application > Helpers
import date_format from '../../helpers/date-formatter'
import global_totals from '../../helpers/global_totals'

// Components
import { Lists, Menus, Recent } from '../../components'

// Styles
import styles from './styles.sass'

const _ = underscore;

export default class Dashboard extends Component {
    constructor( props ) {
        super( props );
        if ( !localStorage.getItem( 'data' ) ) {
            global_totals();
        }
        this.state = _.defaults( _.clone( props || {} ), {
            data: JSON.parse( localStorage.getItem( 'data' ) )
        });
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        const { data } = this.state;
        return (<article className="page-dashboard">
            <Menus.Settings />

            <nav id="menu" className="toolbar--purple">
                <div className="container"><div className="row">
                    <div className="col-2 col-sm-1">
                        <Link to='/dashboard' onClick={ this.toggle } className={ [ 'fas', 'fa-bars', 'lnkSettings', 'js-nav' ].join( ' ' ) } aria-controls="nav-settings">
                            <span className="sr-only">Show Settings</span>
                        </Link>
                    </div>
                    <div className="col-10 col-sm-11">
                        <h1 className="h1 page-title">Lifetime Stats</h1>
                        <time dateTime={ (()=> new Date())() }>{ date_format() }</time>
                    </div>
                    <div className="col-12 col-sm-12">
                        <Lists.Totals { ...data.totals } />
                    </div>
                </div></div>
            </nav>

            <section className="container section--content">
                <div className="row last-workout">
                    <div className="col col-sm-6">
                        <Recent { ...data.workouts[ 0 ] } />
                    </div>
                </div>
                <div className="row workout-list">
                    <div className="col-12 col-sm-6">
                        <h2 className="h4">Recent Workouts</h2>
                        <div className="card card-content">
                            <div className="card-body">
                                <Lists.Workout workouts={ data.workouts } offset={ 1 } vol={ data.totals.vol } />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Link to="/create/workout" className="btn btn-create fas fa-plus"><span className="sr-only">Create a new workout</span></Link>
        </article>);
    }

}