'use strict'

export default str => {
    let date = str && new Date( str ) || new Date();
    return date.toLocaleDateString( undefined, { month: 'short', day: 'numeric', year: 'numeric' } );
}