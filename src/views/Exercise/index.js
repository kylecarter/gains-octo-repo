'use strict'

// Node Modules
import jQuery from 'jquery'
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Node Modules > Bootstrap
import modal from 'bootstrap/js/src/modal'

// Application > Helpers
import date_format from '../../helpers/date-formatter'

// Components
import { Forms, Lists, Menus } from '../../components'

// Styles
import styles from './styles.sass'

const $ = jQuery;
const _ = underscore;

export default class Exercise extends Component {
    constructor( props ) {
        super( props );
        if ( !localStorage.getItem( 'data' ) ) {
            global_totals();
        }
        this.state = _.extend( {
            data: JSON.parse( localStorage.getItem( 'data' ) ),
            exercise: parseInt( window.location.hash.replace( /^#*\/workout\/[0-9]+\/exercise\/([0-9]+)\/*$/, '$1' ) )
        }, props );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    componentDidMount() {
        const self = this;
        $( '#edit-modal' ).modal({
            show: false
        });
        $( '#edit-modal' ).on( 'show.bs.modal', e => self.setState({ modalID: parseInt( e.relatedTarget.getAttribute( 'data-set' ) ) } ) );
    }

    render() {
        const { data, exercise, modalID } = this.state;
        const { id, title, workout, sets, totals } = data.exercises[ _.findIndex( data.exercises, { id: exercise } ) ];
        const listItems = (()=>{
            let arr = [];
            _.each( sets, i => {
                arr.push( data.sets[ _.findIndex( data.sets, { id: i } ) ] );
            });
            return arr;
        })();
        return(<article className="page-exercise">
            <nav className="toolbar--red"><div className="container"><div className="row">
                <div className="col-2 no-padding-right"><Link to={ "/workout/" + workout } className="fas fa-arrow-left lnk lnk-text"><span className="sr-only">Back to main page</span></Link></div>
                <div className="col-5 no-padding"><h1 className="h1 page-title">{ title }</h1></div>
                <div className="col-5"><Menus.Context url={ '/workout/' + workout + '/exercise/' + id } /></div>
            </div></div></nav>
            <section className="section--content"><div className="container">
                <div className="card card-content">
                    <div className="card-body">
                        <h2 className="h3">Totals</h2>
                        <Lists.Totals { ...totals } />
                        <Lists.Exercise  items={ listItems } vol={ totals.vol } editable={ true } />
                    </div>
                </div>
            </div></section>
            <aside className="modal" role="dialog" id="edit-modal">
                <div className="modal-dialog" role="document"><div className="modal-content">
                    <Forms.Edit exerciseID={ id } workoutID={ workout } { ...data.sets[ _.findIndex( data.sets, { id: modalID }) ] } />
                </div></div>
            </aside>
            <Link to={ "/create/workout/" + workout + "/exercise/" + id + "/set" } className="btn btn-create fas fa-plus"><span className="sr-only">Create a new workout</span></Link>
        </article>);
    }
}