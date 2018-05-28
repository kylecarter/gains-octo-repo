// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'
import { NavLink as Link } from 'react-router-dom'

// Styles
import styles from './styles.sass'

const _ = underscore;

export default class Settings extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( _.clone( props ), {
            expose: false
        });
        this.toggle = this.toggle.bind( this );
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        const { expose } = this.state;
        return(<nav id="settings" className={ [ 'nav-settings', expose ? 'exposed' : '' ].join( ' ' ).trim() }><div className="content">
            <section className="toolbar--purple">
                <button className="btn btn-plain fas fa-times close" onClick={ this.toggle } aria-controls="settings"><span className="sr-only">Dismiss</span></button>
                <div className="row">
                    <div className="col-5 col-sm-5 no-padding-left"><img src="/assets/imgs/sandor_celgains.jpg" alt="profile photo" className="img-responsive img-circle" /></div>
                    <div className="col-7 col-sm-7 no-padding-horziontal">
                        <p className="username font-weight-700">Sandor Clegains</p>
                        <p className="useremail font-weight-300">sandor.clegains@gmail.com</p>
                    </div>
                </div>
            </section>
            <section className="section--content">
                <div className="row">
                    <div className="col-12 col-sm-12">
                        <ul className="list-unstyled list-settings">
                            <li><Link to="/" className="ico ico-heart lnk lnk-text">Home</Link></li>
                            <li><Link to="/" className="ico ico-cog lnk lnk-text">Settings</Link></li>
                            <li><Link to="/" className="ico ico-question-circle lnk lnk-text">Help &amp; Feedback</Link></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div></nav>);
    }

    toggle( e ) {
        e.preventDefault();
        this.setState({
            expose: !this.state.expose
        });
        return this;
    }
}