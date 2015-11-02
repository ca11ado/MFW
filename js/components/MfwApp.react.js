/**
 * Created by tos on 02.11.2015.
 */
'use strict';

var React = require('react');
var SearchingSection = require('./SearchingSection.react');
var WordsSection = require('./WordsSection.react');
var Legenda = require('./Legenda.react');
var MfwStore = require('../stores/MfwStore');

function getMfwState() {
    // get state from the store
    /*return {
        infoText: MfwStore.getInfoText(),
        searchHandler: MfwStore.getSearchHandler()
    }*/
}

var MfwApp = React.createClass({

    /*getInitialState: function(){},
    componentDidMount: function() {},
    componentWillUnmount: function(){},*/
    render: function() {
        return (
            <div>
                <SearchingSection />
                <WordsSection />
                <Legenda />
            </div>
        );
    }
});

module.exports = MfwApp;