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
        var legenda = rules.map(function(val,index,arr){
            return React.createElement('li',{key:index},val);
        });

        return (
            <div>
                <ul>{legenda}</ul>
            </div>
        );
    }
});

module.exports = LegendaSection;