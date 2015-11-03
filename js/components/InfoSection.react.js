/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var InfoSection = React.createClass({

    propTypes: {
        getInfo: ReactPropTypes.string
    },

    render: function() {
        return (
            <div id="infoText">
                <p>{this.props.getInfo}</p>
            </div>
        );
    }
});

module.exports = InfoSection;