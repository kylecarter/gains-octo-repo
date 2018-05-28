'use strict'

// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

const _ = underscore;

export default class Totals extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( {}, props );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        const { vol, sets, reps, exc } = this.state;
        return(<ul className="list-inline list-stats">
            <li className="list-inline-item"><strong className="stat">{ vol }</strong> <em className="stat-label">Vol.</em></li>
            <li className="list-inline-item"><strong className="stat">{ exc }</strong> <em className="stat-label">Exc.</em></li>
            <li className="list-inline-item"><strong className="stat">{ sets }</strong> <em className="stat-label">Sets</em></li>
            <li className="list-inline-item"><strong className="stat">{ reps }</strong> <em className="stat-label">Reps.</em></li>
        </ul>);
    }

}