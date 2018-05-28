'use strict'

// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Application > Helpers
import date_format from '../../../helpers/date-formatter'

const _ = underscore;

const Item = ( data )=> {
    const { id, title, date, totals, volume } = data;
    return(<li>
        <Link to={"/workout/" + id } className="lnk lnk-plain">
            <h3 className="h5">{ title }</h3>
            <time dateTime={ new Date( date || '' ) }>{ date_format( date || '' ) }</time>
            <div className="progress progress-lifting">
                <div className="progress-bar bg-danger" style={{ width: Math.round( ( totals.vol / volume ) * 100 ) + '%' }}>{ totals.vol } lbs.</div>
            </div>
        </Link>
    </li>);
}

export default class Workout extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( {}, props );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        const { offset, workouts, vol } = this.state;
        if ( offset ) {
            workouts.splice( 0, offset );
        }
        return(<ul className="list-unstyled list-workouts">
            { workouts.map( ( workout, index )=> {
                let data = _.clone( workout );
                data.volume = vol;
                return <Item key={ 'react.workout.item.' + workout.id + '.' + index } { ...data } />
            }) }
        </ul>);
    }

}