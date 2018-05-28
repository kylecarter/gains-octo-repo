'use strict'

// Node Modules
import axios from 'axios'
import underscore from 'underscore'

const _ = underscore;

export default ()=> {
    axios.get( '/assets/db.json' ).then( resp => {
        return _.clone( resp.data );
    }).then( data => {
        let obj = _.clone( data );
        obj.totals = {
            vol: 0,
            reps: 0,
            sets: obj.sets.length,
            exc: obj.exercises.length
        };

        _.each( obj.exercises, exercise => {
            exercise.totals = {
                vol: 0,
                reps: 0,
                sets: exercise.sets.length
            }
            _.each( exercise.sets, set => {
                if ( !obj.sets[ set ] ) return;
                exercise.totals.reps += obj.sets[ set ].reps;
                exercise.totals.vol += obj.sets[ set ].weight;
            });
        });

        _.each( obj.workouts, workout => {
            workout.totals = {
                vol: 0,
                sets: 0,
                reps: 0,
                exc: workout.exercises.length
            }
            _.each( workout.exercises, exercise => {
                if ( !obj.exercises[ exercise ] ) return;
                workout.totals.vol += obj.exercises[ exercise ].totals.vol;
                workout.totals.sets += obj.exercises[ exercise ].totals.sets;
                workout.totals.reps += obj.exercises[ exercise ].totals.reps;
            });
            obj.totals.vol += workout.totals.vol;
            obj.totals.reps += workout.totals.reps;
        });
        localStorage.setItem( 'data', JSON.stringify( obj ) );
    }).catch( err => console.log( err ) );
}