/**
 * Created by tos on 02.11.2015.
 */
var React = require('react');
var SearchingSection = require('./SearchingSection.react');
var WordsSection = require('./WordsSection.react');
var Legenda = require('./Legenda.react');

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