'use strict'

// Node Modules
import jQuery from 'jquery'
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Node Modules > Bootstrap
import modal from 'bootstrap/js/src/modal'

// Styles
import styles from './styles.sass'

const $ = jQuery;
const _ = underscore;

export default class Set extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( {}, props );
        this.cancel = this.cancel.bind( this );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    componentDidMount() {
        this.$modal = $( '.page-alter #leave-page-modal' ).modal({
            show: false
        });
    }

    render() {
        return(<form action="" className="form-create--set" onSubmit={ this.props.save }>
            <nav className="toolbar--blue"><div className="container"><div className="row">
                <div className="col-2 no-padding-right"><Link to="/dashboard" className="fas fa-times lnk lnk-text" onClick={ this.cancel } onTouchEnd={ this.cancel }><span className="sr-only">Cancel</span></Link></div>
                <div className="col-5 no-padding"><h1 className="h1 page-title">Add Set</h1></div>
                <div className="col-5 text-right"><input type="submit" value="Save" className="btn btn-plain text-uppercase" /></div>
            </div></div></nav>
            <section className="section--content"><div className="container"><div className="card card-content"><div className="card-body">
                <div className="form-row form-textfield">
                    <label htmlFor="reps">Reps</label>
                    <input type="number" name="reps" id="reps" className="form-control" />
                </div>
                <div className="form-row form-textfield">
                    <label htmlFor="weight">Weight</label>
                    <input type="number" name="weight" id="weight" className="form-control" />
                </div>
            </div></div></div></section>
        </form>);
    }
    
    cancel( e ) {
        const data = (()=> {
            const data = $( e.target ).parents( 'form' ).serializeArray();
            let fields = {};
            $.each( data, ( i, e )=> {
                if ( e.name && e.value !== '' ) fields[ e.name ] = e.value;
            });
            return fields;
        })();

        if ( _.isEmpty( data ) ) return this;
        e.preventDefault();

        this.$modal.modal( 'show' );

        return this;
    }
}