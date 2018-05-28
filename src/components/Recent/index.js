'use strict'

// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Application > Helpers
import date_format from '../../helpers/date-formatter'

// Components
import { Lists, Menus, Navs } from '../'

const _ = underscore;

export default class Recent extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( {
            data: JSON.parse( localStorage.getItem( 'data' ) )
        }, props );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        const { id, title, desc, totals, date, exercises, data } = this.state;
        const listItems = (()=>{
            let arr = [];
            _.each( exercises, i => {
                arr.push( data.exercises[ _.findIndex( data.exercises, { id: i } ) ] );
            });
            return arr;
        })();
        return(<div className="card card-content">
            <Menus.Context url={ '/workout/' + id } />
            <div className="card-body">
                <h2 className="h3">{ title }</h2>
                <time dateTime={ (()=> new Date( date || '' ))() }>{ date_format( date || '' ) }</time>
                <h3 className="h4">Totals</h3>
                <Lists.Totals { ...totals } />
                <Lists.Exercise items={ listItems } vol={ totals.vol } />
            </div>
        </div>);
    }
}
