'use strict'

// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Node Modules > Bootstrap
import modal from 'bootstrap/js/src/modal'

// Styles
import styles from './styles.sass'

const _ = underscore;

export default class Workout extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( {}, props );
        this.cancel = this.cancel.bind( this );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        return(<form action="" className="form-create--workout" onSubmit={ this.props.save }>
            <nav className="toolbar--red"><div className="container"><div className="row">
                <div className="col-2 no-padding-right"><Link to="/dashboard" className="fas fa-times lnk lnk-text" onClick={ this.cancel } onTouchEnd={ this.cancel }><span className="sr-only">Cancel</span></Link></div>
                <div className="col-5 no-padding"><h1 className="h1 page-title">Add Workout</h1></div>
                <div className="col-5 text-right"><input type="submit" value="Save" className="btn btn-plain text-uppercase" /></div>
            </div></div></nav>
            <section className="section--content"><div className="container"><div className="card card-content"><div className="card-body">
                <div className="form-row form-textfield">
                    <label htmlFor="title">Workout Name</label>
                    <input type="text" name="title" id="title" className="form-control" defaultValue="" />
                </div>
                <div className="form-row form-textarea">
                    <label htmlFor="desc">Description</label>
                    <textarea className="form-control" name="desc" id="desc"></textarea>
                </div>
                <div className="form-row row">
                    <div className="col-12"><h3 className="h4">Date</h3></div>
                    <div className="col-2 form-textfield">
                        <label htmlFor="month">MM</label>
                        <input type="number" name="month" id="month" min-length="2" max-length="2" defaultValue="" className="form-control" />
                    </div>
                    <div className="col-2 form-textfield">
                        <label htmlFor="day">DD</label>
                        <input type="number" name="day" id="day" min-length="2" max-length="2" defaultValue="" className="form-control" />
                    </div>
                    <div className="col-4 form-textfield">
                        <label htmlFor="year">YYYY</label>
                        <input type="number" name="year" id="year" min-length="4" max-length="4" defaultValue="" className="form-control" />
                    </div>
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