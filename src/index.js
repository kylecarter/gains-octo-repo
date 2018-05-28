'use strict'

// Node Modules
// import React from "react"
// import ReactDOM from "react-dom"
import jQuery from 'jquery'
import modal from 'bootstrap/js/src/modal'

const $ = jQuery;
// Page
// import Main from "./views";

document.addEventListener('deviceready', ( e )=> {
    // ReactDOM.render(
    //     <Main />, 
    //     document.getElementById( 'root' )
    // );
    $( '.js-nav' ).on( 'click touch', ( e )=> {
        $( '#settings' ).toggleClass( 'exposed' );
    });

    $( document.body ).on( 'click touch', '.js-menu', ( e )=> {
        $( '#' + e.target.getAttribute( 'aria-controls' ) ).parent().toggleClass( 'menu-open' );
    });

    $( document.body ).on( 'click touch', '.close', ( e )=> {
        $( '#' + e.target.getAttribute( 'aria-controls' ) ).removeClass( 'exposed' );
    });
}, false);
