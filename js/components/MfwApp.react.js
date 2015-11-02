/**
 * Created by tos on 02.11.2015.
 */
'use strict';

var React = require('react');
var InfoSection = require('./InfoSection.react');
var InputSection = require('./InfoSection.react');
var SelectionSection = require('./SelectionSection.react');
var OutputSection = require('./OutputSection.react');
var LegendaSection = require('./LegendaSection.react');
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
                <InfoSection />
                <InputSection />
                <SelectionSection />
                <OutputSection />
                <LegendaSection />
            </div>
        );
    }
});

module.exports = MfwApp;