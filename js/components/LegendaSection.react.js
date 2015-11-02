/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var LegendaSection = React.createClass({

    propTypes: {
        getRules: ReactPropTypes.array.isRequired
    },

    render: function() {
        var rules = this.props.getRules;
        /*var legenda = rules.map(function(val,index,arr){
            return '<li>' + val + '</li>';
        });*/

        return (
            <div>
                <ul>{rules}</ul>
            </div>
        );
    }
});

module.exports = LegendaSection;