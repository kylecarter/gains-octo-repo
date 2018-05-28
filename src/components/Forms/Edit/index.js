// Node Modules
import underscore from 'underscore'
import React, { Component } from 'react'

// Styles
import styles from './styles.sass'

const _ = underscore;

export default class Context extends Component {
    constructor( props ) {
        super( props );
        this.state = _.extend( _.clone( props ), {
            expose: false
        });
    }

    static getDerivedStateFromProps( props, state ) {
        return _.defaults( _.clone( props ), {} );
    }

    render() {
        const { expose, id, reps, weight, exerciseID, workoutID } = this.state;
        return(<form action="" className="form-edit" onSubmit={ this.props.save }>
            <header className="modal-header">
                <h3 className="h5">Edit Set</h3>
                <button type="button" data-dismiss="modal" aria-label="Close" className="btn btn-plain fas fa-times close"><span className="sr-only">Close</span></button>
            </header>
            <div className="modal-body">
                <div className="form-row form-textfield">
                    <label htmlFor="reps">Reps</label>
                    <input type="number" name="reps" id="reps" className={ [ "form-control", reps ? 'valued' : '' ].join( ' ' ).trim() } defaultValue={ reps || '' } />
                </div>
                <div className="form-row form-textfield">
                    <label htmlFor="weight">Weight</label>
                    <input type="number" name="weight" id="weight" className={ [ "form-control", weight ? 'valued' : '' ].join( ' ' ).trim() } defaultValue={ weight || '' } />
                </div>
            </div>
            <footer className="modal-footer">
                <input type="button" value="Delete" className="btn btn-default" onClick={ this.props.delete } onTouchEnd={ this.props.delete } />
                <input type="submit" value="Save" className="btn btn-primary" />
            </footer>
            <input type="hidden" name="workout" defaultValue={ workoutID } />
            <input type="hidden" name="exercise" defaultValue={ exerciseID } />
            <input type="hidden" name="set" defaultValue={ id } />
        </form>);
    }

}