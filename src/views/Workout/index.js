'use strict'

// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Application > Helpers
import date_format from '../../helpers/date-formatter'
import global_totals from '../../helpers/global_totals'

// Components
import { Lists, Menus } from '../../components'

// Styles
import styles from './styles.sass'

const _ = underscore;

export default class Workout extends Component {
    constructor( props ) {
        super( props );
        if ( !localStorage.getItem( 'data' ) ) {
            global_totals();
        }
        this.state = _.extend( {
            data: JSON.parse( localStorage.getItem( 'data' ) ),
            workout: parseInt( window.location.hash.replace( /^#*\/workout\/([0-9]+)\/*$/, '$1' ) )
        }, props );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        const { data, workout } = this.state;
        const { id, title, desc, date, exercises, totals } = data.workouts[ _.findIndex( data.workouts, { id: workout } ) ];
        const listItems = (()=>{
            let arr = [];
            _.each( exercises, i => {
                arr.push( data.exercises[ _.findIndex( data.exercises, { id: i } ) ] );
            });
            return arr;
        })();
        return(<article className="page-workout">
            <nav className="toolbar--blue"><div className="container"><div className="row">
                <div className="col-2 no-padding-right"><Link to="/dashboard" className="fas fa-arrow-left lnk lnk-text"><span className="sr-only">Back to main page</span></Link></div>
                <div className="col-5 no-padding"><h1 className="h1 page-title">{ title }</h1></div>
                <div className="col-5"><Menus.Context url={ '/workout/' + id } /></div>
            </div></div></nav>
            <section className="section--content"><div className="container">
                <div className="card card-content meta-workout">
                    <div className="card-body">
                        <h2 className="h4">Description</h2>
                        <p>{ desc }</p>
                        <h2 className="h4">Date</h2>
                        <time dateTime={ new Date( date || '' ) }>{ date_format( date || '' ) }</time>
                    </div>
                </div>
                <div className="card card-content">
                    <div className="card-body">
                        <h2 className="h3">Totals</h2>
                        <Lists.Totals { ...totals } />
                        <Lists.Exercise links={ true } items={ listItems } vol={ totals.vol } />
                    </div>
                </div>
            </div></section>
            <Link to={ "/create/workout/" + id + "/exercise" } className="btn btn-create fas fa-plus"><span className="sr-only">Create a new workout</span></Link>
        </article>);
    }
}