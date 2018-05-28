// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Styles
import styles from './styles.sass'

const _ = underscore;

export default class Context extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( _.clone( props ), {
            expose: false
        });
        this.show = this.show.bind( this );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        const { expose, url } = this.state;
        return(<nav className={ [ 'context', expose ? 'menu-open' : '' ].join( ' ' ).trim() }>
            <button className="btn btn-plain fas fa-ellipsis-v js-menu" onClick={ this.show } onTouchEnd={ this.show } aria-controls="context-menu"><span className="sr-only">Edit Workout</span></button>
            <ul className="list-unstyled list-menu" id="context-menu">
                <li><Link to={ "/edit" + url } className="lnk lnk-text">Edit</Link></li>
                <li><Link to={ url } className="lnk lnk-text">View</Link></li>
                <li><Link to={ '/delete' + url } className="lnk lnk-text">Remove</Link></li>
            </ul>
        </nav>);
    }

    show( e ) {
        e.preventDefault();
        this.setState({
            expose: !this.state.expose
        });
        return this;
    }
}