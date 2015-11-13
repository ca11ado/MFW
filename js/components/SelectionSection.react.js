/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var SelectionSection = React.createClass({

  propTypes: {
    getSelected: ReactPropTypes.array.isRequired
  },

  render: function() {
    var words = this.props.getSelected.map(function(v,index,arr){
      return React.createElement('span', {key:index}, v + ' ');
    });
    return (
      <div id={this.props.id}>
        {words}
      </div>
    );
  }
});

module.exports = SelectionSection;