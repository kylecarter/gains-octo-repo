'use strict'

// Node Modules
import jQuery from 'jquery'
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Components
import { Forms } from '../../components'

// Styles
import styles from './styles.sass'

const $ = jQuery;
const _ = underscore;

export default class Alter extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( {}, props );
        this.cleanup = this.cleanup.bind( this );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        return(<article className="page-alter">
            <Forms.Set />
            <Forms.Exercise />
            <Forms.Workout />
            <aside className="modal" role="dialog" id="leave-page-modal">
                <div className="modal-dialog" role="document"><div className="modal-content">
                    <header className="modal-header">
                        <button type="button" data-dismiss="modal" aria-label="Close" className="btn btn-plain fas fa-times close"><span className="sr-only">Close</span></button>
                    </header>
                        <div className="modal-body">
                            <p>Are you sure you want to quit editing? Data entered will be lost.</p>
                        </div>
                    <footer className="modal-footer">
                        <button type="button" data-dismiss="modal" aria-label="Close" className="btn btn-default text-uppercase">No</button>
                        <Link to="/workout/4" className="btn btn-primary text-uppercase" onClick={ this.cleanup } onTouchEnd={ this.cleanup }>Yes</Link>
                    </footer>
                </div></div>
            </aside>
        </article>);
    }

    cleanup( e ) {
        $( '.modal-backdrop.show' ).remove();
    }
}