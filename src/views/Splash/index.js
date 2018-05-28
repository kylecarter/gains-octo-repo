'use strict'

// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'

// Applicaiton > Helpers
import global_totals from '../../helpers/global_totals'

// Styles
import styles from './styles.sass'

const _ = underscore;

export default class Splash extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( {}, props );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    componentDidMount() {
        const self = this;
        ( new Promise( ( res, rej )=> {
            global_totals();
            res();
            rej();
        }) ).then(()=> window.setTimeout( ()=> window.location.hash = '/dashboard', 2000 ) ).catch( err => console.log( err ) );
        
    }

    render() {
        return(<article className="page-splash">
            <section className="section--content">
                <h1 className="h1 text-uppercase">Gains</h1>
                <img className="img-responsive" src="assets/imgs/weight.png" alt="dumbell graphic" />
            </section>
        </article>);
    }
}