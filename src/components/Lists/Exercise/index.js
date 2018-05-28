'use strict'

// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Styles
import styles from './styles.sass'

const _ = underscore;

class Item extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( {}, props );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        const { links, vol, id, title, totals, workout, editable, weight, reps } = this.state;
        let volume = totals && totals.vol || weight || 1;
        const percent = Math.round( ( volume / vol ) * 100 );
        if ( !links ) {
            return (<li className="list-progress--item">
            <h4 className="h5">{ title }</h4>
            { totals && <span className="stat">{ totals.sets } sets</span> }
            { totals && <span className="stat">{ totals.reps } reps</span> }
            { reps && <span className="stat">{ reps } reps</span> }
            <div className="progress progress-lifting">
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: percent + '%' }} aria-valuenow={ percent + '%' } aria-valuemin="0" aria-valuemax="100">{ volume } lbs.</div>
            </div>
            { editable && <button type="button" className="btn btn-plain fas fa-edit" data-toggle="modal" data-target="#edit-modal" data-set={ id }><span className="sr-only"></span></button> }
        </li>);
        }

        return (<li className="list-progress--item"><Link to={ '/workout/' + workout + '/exercise/' + id } className="lnk lnk-text">
            <h4 className="h5">{ title }</h4>
            { totals && <span className="stat">{ totals.sets } sets</span> }
            { totals && <span className="stat">{ totals.reps } reps</span> }
            { reps && <span className="stat">{ reps } reps</span> }
            <div className="progress progress-lifting">
                <div className="progress-bar bg-primary" role="progressbar" style={{ width: percent + '%' }} aria-valuenow={ percent + '%' } aria-valuemin="0" aria-valuemax="100">{ volume } lbs.</div>
            </div>
        </Link></li>);
    }
}

export default class Exercises extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( {}, props );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        const { links, items, vol, editable } = this.state;
        return(<ul className="list-unstyled list-progress">
            { items.map( ( item, index )=> <Item key={ 'react.exercise.item.' + item.id + '.' + index } links={ links } vol={ vol } editable={ editable } { ...item } /> )}
        </ul>);
    }

}